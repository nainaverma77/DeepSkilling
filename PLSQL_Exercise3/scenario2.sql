-- scenario2.sql
-- Stored procedure to update employee salaries in a department by adding a bonus percentage.

SET SERVEROUTPUT ON;

-- 1. Create or replace the stored procedure
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_dept IN VARCHAR2,
    p_bonus_percentage IN NUMBER
) AS
    -- Cursor to select department employees for updates with locking
    CURSOR c_employees IS
        SELECT EmployeeID, Name, Salary 
        FROM Employees 
        WHERE Department = p_dept 
        FOR UPDATE;
        
    v_bonus NUMBER(10, 2);
    v_count NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Starting UpdateEmployeeBonus for Department: ' || p_dept || ' (' || p_bonus_percentage || '%) ---');
    
    -- Check for negative bonus
    IF p_bonus_percentage < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Bonus percentage cannot be negative.');
    END IF;

    FOR r_emp IN c_employees LOOP
        -- Calculate bonus amount
        v_bonus := r_emp.Salary * (p_bonus_percentage / 100);
        
        -- Update the salary
        UPDATE Employees
        SET Salary = Salary + v_bonus
        WHERE CURRENT OF c_employees;
        
        DBMS_OUTPUT.PUT_LINE('Employee: ' || r_emp.Name || ' (ID: ' || r_emp.EmployeeID || 
                             ') | Old Salary: $' || TRIM(TO_CHAR(r_emp.Salary, '999,999.99')) || 
                             ' | Bonus: $' || TRIM(TO_CHAR(v_bonus, '99,999.99')) || 
                             ' | New Salary: $' || TRIM(TO_CHAR(r_emp.Salary + v_bonus, '999,999.99')));
        v_count := v_count + 1;
    END LOOP;
    
    IF v_count = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No employees found or updated in department: ' || p_dept);
    ELSE
        DBMS_OUTPUT.PUT_LINE('UpdateEmployeeBonus completed successfully. Total employees updated: ' || v_count);
    END IF;
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error updating employee bonus: ' || SQLERRM);
        RAISE;
END;
/

-- 2. Test the procedure
DECLARE
BEGIN
    DBMS_OUTPUT.PUT_LINE('===================================================');
    DBMS_OUTPUT.PUT_LINE('TESTING SCENARIO 2: UpdateEmployeeBonus');
    DBMS_OUTPUT.PUT_LINE('===================================================');
    
    -- Print employees before update
    DBMS_OUTPUT.PUT_LINE('Employees before updates:');
    FOR r IN (SELECT EmployeeID, Name, Department, Salary FROM Employees) LOOP
        DBMS_OUTPUT.PUT_LINE('ID: ' || r.EmployeeID || ' | Name: ' || r.Name || ' | Dept: ' || r.Department || ' | Salary: $' || r.Salary);
    END LOOP;
    
    -- Test Case 1: IT department 10% bonus
    DBMS_OUTPUT.PUT_LINE('--- Case 1: Apply 10% bonus to IT ---');
    UpdateEmployeeBonus('IT', 10);
    
    -- Test Case 2: HR department 5% bonus
    DBMS_OUTPUT.PUT_LINE('--- Case 2: Apply 5% bonus to HR ---');
    UpdateEmployeeBonus('HR', 5);
    
    -- Test Case 3: Marketing department (doesn't exist)
    DBMS_OUTPUT.PUT_LINE('--- Case 3: Apply 10% bonus to Marketing (Non-existent) ---');
    UpdateEmployeeBonus('Marketing', 10);

    -- Print employees after update
    DBMS_OUTPUT.PUT_LINE('Employees after updates:');
    FOR r IN (SELECT EmployeeID, Name, Department, Salary FROM Employees) LOOP
        DBMS_OUTPUT.PUT_LINE('ID: ' || r.EmployeeID || ' | Name: ' || r.Name || ' | Dept: ' || r.Department || ' | Salary: $' || r.Salary);
    END LOOP;
    
    DBMS_OUTPUT.PUT_LINE('===================================================');
END;
/
