-- scenario3.sql
-- Stored procedure to transfer funds between accounts with balance checking and transaction safety.

SET SERVEROUTPUT ON;

-- 1. Create or replace the stored procedure
CREATE OR REPLACE PROCEDURE TransferFunds (
    p_source_acc IN NUMBER,
    p_dest_acc IN NUMBER,
    p_amount IN NUMBER
) AS
    v_source_balance NUMBER(12, 2);
    v_dest_exists NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Starting TransferFunds: $' || TRIM(TO_CHAR(p_amount, '99,999.99')) || 
                         ' from Account ' || p_source_acc || ' to Account ' || p_dest_acc || ' ---');
                         
    -- Validate transfer amount is positive
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Transfer amount must be greater than zero.');
    END IF;
    
    -- Validate source and destination are different
    IF p_source_acc = p_dest_acc THEN
        RAISE_APPLICATION_ERROR(-20006, 'Source and destination accounts must be different.');
    END IF;

    -- Retrieve and lock source account balance to prevent race conditions
    BEGIN
        SELECT Balance INTO v_source_balance
        FROM Accounts
        WHERE AccountID = p_source_acc
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Source account ' || p_source_acc || ' does not exist.');
    END;

    -- Verify destination account exists
    SELECT COUNT(*) INTO v_dest_exists
    FROM Accounts
    WHERE AccountID = p_dest_acc;
    
    IF v_dest_exists = 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Destination account ' || p_dest_acc || ' does not exist.');
    END IF;

    -- Verify source account has sufficient balance
    IF v_source_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20005, 'Insufficient balance. Source account balance is $' || 
                                TRIM(TO_CHAR(v_source_balance, '99,999.99')) || 
                                ', requested transfer: $' || TRIM(TO_CHAR(p_amount, '99,999.99')));
    END IF;

    -- Debit source account
    UPDATE Accounts
    SET Balance = Balance - p_amount
    WHERE AccountID = p_source_acc;

    -- Credit destination account
    UPDATE Accounts
    SET Balance = Balance + p_amount
    WHERE AccountID = p_dest_acc;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('TransferFunds completed successfully. $' || TRIM(TO_CHAR(p_amount, '99,999.99')) || 
                         ' transferred from Account ' || p_source_acc || ' to Account ' || p_dest_acc || '.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Transfer failed: ' || SQLERRM);
        RAISE;
END;
/

-- 2. Test the procedure
DECLARE
    PROCEDURE print_accounts AS
    BEGIN
        FOR r IN (SELECT AccountID, CustomerID, AccountType, Balance FROM Accounts) LOOP
            DBMS_OUTPUT.PUT_LINE('Account ID: ' || r.AccountID || ' | Cust ID: ' || r.CustomerID || 
                                 ' | Type: ' || r.AccountType || ' | Balance: $' || r.Balance);
        END LOOP;
    END;
BEGIN
    DBMS_OUTPUT.PUT_LINE('===================================================');
    DBMS_OUTPUT.PUT_LINE('TESTING SCENARIO 3: TransferFunds');
    DBMS_OUTPUT.PUT_LINE('===================================================');
    
    DBMS_OUTPUT.PUT_LINE('Accounts state before transfer:');
    print_accounts;
    
    -- Test Case 1: Valid transfer (from Account 1 [John Doe Savings] to Account 2 [John Doe Checking] - $1000)
    DBMS_OUTPUT.PUT_LINE('--- Case 1: Valid Transfer ($1000 from Account 1 to Account 2) ---');
    TransferFunds(1, 2, 1000);
    
    -- Test Case 2: Insufficient balance transfer (from Account 2 to Account 1 - $10,000)
    DBMS_OUTPUT.PUT_LINE('--- Case 2: Insufficient Balance ($10000 from Account 2 to Account 1) ---');
    BEGIN
        TransferFunds(2, 1, 10000);
    EXCEPTION
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Caught expected exception for insufficient balance: ' || SQLERRM);
    END;

    -- Test Case 3: Invalid account transfer (destination account 999)
    DBMS_OUTPUT.PUT_LINE('--- Case 3: Non-existent destination account ($500 from Account 1 to Account 999) ---');
    BEGIN
        TransferFunds(1, 999, 500);
    EXCEPTION
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Caught expected exception for non-existent destination account: ' || SQLERRM);
    END;

    DBMS_OUTPUT.PUT_LINE('Accounts state after transfers:');
    print_accounts;
    
    DBMS_OUTPUT.PUT_LINE('===================================================');
END;
/
