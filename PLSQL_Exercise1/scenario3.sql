-- scenario3.sql
-- PL/SQL block that fetches all loans due in the next 30 days and prints a reminder message for each customer.

SET SERVEROUTPUT ON;

DECLARE
    -- Cursor to select loans due in the next 30 days, joining with Customers to get customer's name
    CURSOR c_due_loans IS
        SELECT c.Name, l.LoanID, l.LoanAmount, l.DueDate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30;
        
    v_reminder_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== RUNNING SCENARIO 3: Send Loan Due Reminders ===');
    FOR r_loan IN c_due_loans LOOP
        DBMS_OUTPUT.PUT_LINE('REMINDER: Dear ' || r_loan.Name || ', your loan (ID: ' || r_loan.LoanID || 
                             ') of $' || TRIM(TO_CHAR(r_loan.LoanAmount, '99,999.99')) || 
                             ' is due on ' || TO_CHAR(r_loan.DueDate, 'YYYY-MM-DD') || 
                             '. Please ensure sufficient balance in your account.');
        v_reminder_count := v_reminder_count + 1;
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('Scenario 3 completed. Total reminder messages printed: ' || v_reminder_count);
END;
/
