# PL/SQL Exercise 3: Stored Procedures

This repository contains the solution for **Exercise 3: Stored Procedures** of the database engineering assignments. It showcases the design and implementation of modular, secure, and transaction-safe PL/SQL stored procedures for real-world banking and business scenarios.

## Files Structure

- [schema.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/schema.sql): Sets up the relational schema (`Customers`, `Accounts`, `Employees` tables) and inserts sample data.
- [scenario1.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario1.sql): Defines and tests the `ProcessMonthlyInterest` stored procedure (monthly interest updates for savings accounts).
- [scenario2.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario2.sql): Defines and tests the `UpdateEmployeeBonus` stored procedure (updating salary by department based on a bonus percentage).
- [scenario3.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario3.sql): Defines and tests the `TransferFunds` stored procedure (handling account-to-account transfers with balance validation and transactions).
- [test_all.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/test_all.sql): Compiles and runs all schemas and procedures sequentially, displaying before-and-after states.
- [run_simulation.js](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/run_simulation.js): A lightweight JavaScript execution of all three scenario rules to test locally.

---

## Scenario Explanations & Code

### Scenario 1: Process Monthly Interest for Savings Accounts
**Problem**: The bank needs to process monthly interest for all savings accounts by applying an interest rate of 1% to the current balance.
- **Logic**: Selects accounts of type `'Savings'` using a cursor, calculates the interest (1%), updates each balance, prints execution logs, and commits the changes.
- **Transactional Safety**: Utilizes `FOR UPDATE` and `CURRENT OF` to securely lock rows, preventing concurrent modification anomalies. Includes transactional error handling with rollback.

```sql
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
    CURSOR c_savings IS
        SELECT AccountID, Balance 
        FROM Accounts 
        WHERE AccountType = 'Savings' 
        FOR UPDATE;
    v_interest NUMBER(12, 2);
    v_count NUMBER := 0;
BEGIN
    FOR r_acc IN c_savings LOOP
        v_interest := r_acc.Balance * 0.01;
        UPDATE Accounts
        SET Balance = Balance + v_interest
        WHERE CURRENT OF c_savings;
        v_count := v_count + 1;
    END LOOP;
    COMMIT;
END;
/
```

---

### Scenario 2: Employee Departmental Bonus Updates
**Problem**: The bank wants to implement a departmental bonus scheme for employees. Write a stored procedure `UpdateEmployeeBonus` that updates the salary of employees in a given department by adding a bonus percentage.
- **Logic**: Accepts `p_dept` and `p_bonus_percentage` as inputs. Filters employee records matching the department, calculates the bonus, and updates salaries.
- **Safety**: Validates that the bonus percentage is non-negative and prints a user-friendly message if no employees are found in the target department.

```sql
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_dept IN VARCHAR2,
    p_bonus_percentage IN NUMBER
) AS
    CURSOR c_employees IS
        SELECT EmployeeID, Name, Salary 
        FROM Employees 
        WHERE Department = p_dept 
        FOR UPDATE;
    v_bonus NUMBER(10, 2);
BEGIN
    IF p_bonus_percentage < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Bonus percentage cannot be negative.');
    END IF;

    FOR r_emp IN c_employees LOOP
        v_bonus := r_emp.Salary * (p_bonus_percentage / 100);
        UPDATE Employees
        SET Salary = Salary + v_bonus
        WHERE CURRENT OF c_employees;
    END LOOP;
    COMMIT;
END;
/
```

---

### Scenario 3: Inter-Account Funds Transfer
**Problem**: Customers should be able to transfer funds between their accounts. Write a stored procedure `TransferFunds` that transfers a specified amount from one account to another, checking that the source account has sufficient balance before making the transfer.
- **Logic**: Accepts `p_source_acc`, `p_dest_acc`, and `p_amount` parameters. It validates that:
  1. The transfer amount is positive.
  2. The source and destination accounts are different.
  3. Both accounts exist in the database.
  4. The source account has a sufficient balance to cover the transfer.
- **Transactional Safety**: Obtains a row lock (`FOR UPDATE`) on the source account before reading and updating balances to prevent race conditions. Uses an atomic database transaction (COMMITs only if all checks and updates succeed; ROLLBACKs on any failure).

```sql
CREATE OR REPLACE PROCEDURE TransferFunds (
    p_source_acc IN NUMBER,
    p_dest_acc IN NUMBER,
    p_amount IN NUMBER
) AS
    v_source_balance NUMBER(12, 2);
    v_dest_exists NUMBER;
BEGIN
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Transfer amount must be greater than zero.');
    END IF;

    -- Fetch and lock source balance
    SELECT Balance INTO v_source_balance
    FROM Accounts WHERE AccountID = p_source_acc FOR UPDATE;

    -- Verify destination account exists
    SELECT COUNT(*) INTO v_dest_exists FROM Accounts WHERE AccountID = p_dest_acc;
    IF v_dest_exists = 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Destination account does not exist.');
    END IF;

    -- Verify balance
    IF v_source_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20005, 'Insufficient balance.');
    END IF;

    -- Perform transfer
    UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_source_acc;
    UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_dest_acc;
    COMMIT;
END;
/
```

---

## How to Run the Code

### Option 1: Run Locally using Node.js Simulation (Recommended)
You can run the simulated stored procedures locally without an Oracle Database engine installed:

1. Open your terminal in VS Code.
2. Execute the simulation script:
   ```bash
   node PLSQL_Exercise3/run_simulation.js
   ```
3. Check the tables state before/after, validation message outputs, and success statements.

### Option 2: Run Online using Oracle Live SQL
1. Open your browser and go to [Oracle Live SQL](https://livesql.oracle.com).
2. Log in using your Oracle credentials.
3. Copy and run the contents of [schema.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/schema.sql) to set up tables and sample data.
4. Copy and execute [scenario1.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario1.sql), [scenario2.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario2.sql), and [scenario3.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise3/scenario3.sql) sequentially to register and test the procedures.
