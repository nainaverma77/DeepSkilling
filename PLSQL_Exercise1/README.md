# PL/SQL Exercise 1: Control Structures

This repository contains the solution for **Exercise 1: Control Structures** of the database engineering assignments. It showcases the use of various PL/SQL control structures (such as loops, conditionals, cursors, and SQL attributes) to implement banking scenarios.

## Files Structure

- [schema.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/schema.sql): Sets up tables and inserts sample test cases.
- [scenario1.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario1.sql): Solves Scenario 1 (senior customer interest discount).
- [scenario2.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario2.sql): Solves Scenario 2 (promoting customers to VIP status).
- [scenario3.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario3.sql): Solves Scenario 3 (reminding customers of due loans).
- [test_all.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/test_all.sql): Runs all scripts sequentially and displays the before/after results.
- **plsql_output_screenshot.png**: Screenshot of the SQL execution output.

---

## Scenario Explanations & Code

### Scenario 1: Senior Citizen Loan Interest Rate Discount
**Problem**: The bank wants to apply a 1% discount to loan interest rates for customers above 60 years old.
- **Logic**: Iterates through all customers using a cursor, checks if `Age > 60` using an `IF` condition, and updates the customer's interest rates in the `Loans` table.
- **Control Structures**: Cursor Loop (`FOR...LOOP`) and Conditional (`IF...THEN`).

```sql
DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Name, Age FROM Customers;
    v_discount_applied NUMBER := 0;
BEGIN
    FOR r_cust IN c_customers LOOP
        IF r_cust.Age > 60 THEN
            UPDATE Loans
            SET InterestRate = InterestRate - 1.00
            WHERE CustomerID = r_cust.CustomerID;
            
            IF SQL%FOUND THEN
                DBMS_OUTPUT.PUT_LINE('Applied 1% discount to customer ' || r_cust.Name || ' (Age: ' || r_cust.Age || ')');
                v_discount_applied := v_discount_applied + SQL%ROWCOUNT;
            END IF;
        END IF;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Scenario 1 completed. Total loans updated: ' || v_discount_applied);
    COMMIT;
END;
/
```

---

### Scenario 2: Promote Customers to VIP Status
**Problem**: A customer can be promoted to VIP status based on their balance. Write a block that iterates through all customers and sets a flag `IsVIP` to `TRUE` for those with a balance over $10,000.
- **Logic**: Loops through all customers and checks if their balance is greater than 10000. If so, updates their `IsVIP` flag to `'TRUE'`.
- **Control Structures**: Cursor Loop (`FOR...LOOP`) and Conditional (`IF...THEN`).

```sql
DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Name, Balance, IsVIP FROM Customers;
    v_vip_count NUMBER := 0;
BEGIN
    FOR r_cust IN c_customers LOOP
        IF r_cust.Balance > 10000.00 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = r_cust.CustomerID;
            
            DBMS_OUTPUT.PUT_LINE('Promoted customer ' || r_cust.Name || ' to VIP. Balance: $' || r_cust.Balance);
            v_vip_count := v_vip_count + 1;
        END IF;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Scenario 2 completed. Total customers promoted: ' || v_vip_count);
    COMMIT;
END;
/
```

---

### Scenario 3: Loan Due Date Reminders
**Problem**: The bank wants to send reminders to customers whose loans are due within the next 30 days. Write a block that fetches all loans due in the next 30 days and prints a reminder message for each customer.
- **Logic**: Cursor selection utilizes SQL join between `Loans` and `Customers`, filtering records where `DueDate` falls in the range `[SYSDATE, SYSDATE + 30]`. It prints a customized string reminder.
- **Control Structures**: Cursor Loop (`FOR...LOOP`).

```sql
DECLARE
    CURSOR c_due_loans IS
        SELECT c.Name, l.LoanID, l.LoanAmount, l.DueDate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30;
    v_reminder_count NUMBER := 0;
BEGIN
    FOR r_loan IN c_due_loans LOOP
        DBMS_OUTPUT.PUT_LINE('REMINDER: Dear ' || r_loan.Name || ', your loan (ID: ' || r_loan.LoanID || 
                             ') of $' || TRIM(TO_CHAR(r_loan.LoanAmount, '99,999.99')) || 
                             ' is due on ' || TO_CHAR(r_loan.DueDate, 'YYYY-MM-DD') || '.');
        v_reminder_count := v_reminder_count + 1;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Scenario 3 completed. Reminders printed: ' || v_reminder_count);
END;
/
```

---

## How to Run the Code

Since Oracle Database is a large software (requires manual installation and administrative setups), you have two options to run this code:

### Option 1: Run Locally using Node.js Simulation (Recommended)
We have provided a local simulation script [run_simulation.js](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/run_simulation.js) which executes the exact logical control structures of the PL/SQL blocks directly in your terminal using Node.js.

1. Open your VS Code terminal.
2. Run the command:
   ```bash
   node PLSQL_Exercise1/run_simulation.js
   ```
3. The output will show the tables before updates, logs for each scenario run, and the updated table states.

### Option 2: Run Online using Oracle Live SQL
You can run the exact Oracle PL/SQL scripts online without installing anything:
1. Go to [Oracle Live SQL](https://livesql.oracle.com).
2. Log in with a free Oracle Account.
3. Open [schema.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/schema.sql), copy the contents, paste them into the SQL Worksheet, and click **Run** to set up the tables and data.
4. Copy and run the PL/SQL blocks from [scenario1.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario1.sql), [scenario2.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario2.sql), and [scenario3.sql](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/PLSQL_Exercise1/scenario3.sql) one by one.
5. To see the output, ensure **Server Output** is checked/enabled.

---

## Execution Output Screenshot

Below is the screenshot showing the successful execution of the PL/SQL blocks (showing the tables' states before and after the execution of the PL/SQL blocks):

![PL/SQL Execution Output Screenshot](plsql_output_screenshot.png)

