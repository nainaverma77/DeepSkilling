-- scenario2.sql
-- PL/SQL block that iterates through all customers and sets IsVIP to TRUE if balance is over $10,000.

SET SERVEROUTPUT ON;

DECLARE
    -- Cursor to iterate through all customers
    CURSOR c_customers IS
        SELECT CustomerID, Name, Balance, IsVIP FROM Customers;
        
    v_vip_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== RUNNING SCENARIO 2: Promote Customers to VIP ===');
    FOR r_cust IN c_customers LOOP
        -- Check if balance is over $10,000
        IF r_cust.Balance > 10000.00 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = r_cust.CustomerID;
            
            DBMS_OUTPUT.PUT_LINE('Promoted customer ' || r_cust.Name || ' to VIP. Balance: $' || r_cust.Balance);
            v_vip_count := v_vip_count + 1;
        END IF;
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('Scenario 2 completed. Total customers promoted to VIP: ' || v_vip_count);
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error in Scenario 2: ' || SQLERRM);
END;
/
