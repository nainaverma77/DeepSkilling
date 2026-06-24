-- scenario1.sql
-- PL/SQL block that loops through all customers, checks their age, and if above 60, applies a 1% discount to interest rates.

SET SERVEROUTPUT ON;

DECLARE
    -- Cursor to fetch all customers and their age
    CURSOR c_customers IS
        SELECT CustomerID, Name, Age FROM Customers;
        
    v_discount_applied NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== RUNNING SCENARIO 1: Apply Senior Discount ===');
    FOR r_cust IN c_customers LOOP
        -- Check if the customer is above 60 years old
        IF r_cust.Age > 60 THEN
            -- Update interest rates by subtracting 1% (e.g. 8.50% becomes 7.50%)
            UPDATE Loans
            SET InterestRate = InterestRate - 1.00
            WHERE CustomerID = r_cust.CustomerID;
            
            -- If a loan was updated, print a message and increment counter
            IF SQL%FOUND THEN
                DBMS_OUTPUT.PUT_LINE('Applied 1% discount to customer ' || r_cust.Name || ' (Age: ' || r_cust.Age || ')');
                v_discount_applied := v_discount_applied + SQL%ROWCOUNT;
            END IF;
        END IF;
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('Scenario 1 completed. Total loans updated with senior discount: ' || v_discount_applied);
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error in Scenario 1: ' || SQLERRM);
END;
/
