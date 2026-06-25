-- scenario1.sql
-- Stored procedure to apply 1% monthly interest to all savings accounts.

SET SERVEROUTPUT ON;

-- 1. Create or replace the stored procedure
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
    -- Cursor to select savings accounts for updates with locking to prevent concurrency issues
    CURSOR c_savings IS
        SELECT AccountID, Balance 
        FROM Accounts 
        WHERE AccountType = 'Savings' 
        FOR UPDATE;
        
    v_interest NUMBER(12, 2);
    v_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Starting ProcessMonthlyInterest ---');
    
    FOR r_acc IN c_savings LOOP
        -- Calculate 1% interest
        v_interest := r_acc.Balance * 0.01;
        
        -- Update the balance
        UPDATE Accounts
        SET Balance = Balance + v_interest
        WHERE CURRENT OF c_savings;
        
        DBMS_OUTPUT.PUT_LINE('Account ID: ' || r_acc.AccountID || 
                             ' | Old Balance: $' || TRIM(TO_CHAR(r_acc.Balance, '99,999.99')) || 
                             ' | Interest Added: $' || TRIM(TO_CHAR(v_interest, '999.99')) || 
                             ' | New Balance: $' || TRIM(TO_CHAR(r_acc.Balance + v_interest, '99,999.99')));
        v_count := v_count + 1;
    END LOOP;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('ProcessMonthlyInterest completed successfully. Total savings accounts updated: ' || v_count);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error processing monthly interest: ' || SQLERRM);
        RAISE;
END;
/

-- 2. Test the procedure
DECLARE
    v_savings_before NUMBER;
    v_savings_after NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('===================================================');
    DBMS_OUTPUT.PUT_LINE('TESTING SCENARIO 1: ProcessMonthlyInterest');
    DBMS_OUTPUT.PUT_LINE('===================================================');
    
    -- Print current savings accounts state
    DBMS_OUTPUT.PUT_LINE('Savings Accounts before execution:');
    FOR r IN (SELECT AccountID, Balance FROM Accounts WHERE AccountType = 'Savings') LOOP
        DBMS_OUTPUT.PUT_LINE('Account ID: ' || r.AccountID || ' | Balance: $' || r.Balance);
    END LOOP;
    
    -- Call the stored procedure
    ProcessMonthlyInterest;
    
    -- Print current savings accounts state after execution
    DBMS_OUTPUT.PUT_LINE('Savings Accounts after execution:');
    FOR r IN (SELECT AccountID, Balance FROM Accounts WHERE AccountType = 'Savings') LOOP
        DBMS_OUTPUT.PUT_LINE('Account ID: ' || r.AccountID || ' | Balance: $' || r.Balance);
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('===================================================');
END;
/
