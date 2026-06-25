-- test_all.sql
-- Master script to run schema setup and all stored procedures scenarios in sequence.

SET SERVEROUTPUT ON;
SET PAGESIZE 50;
SET LINESIZE 120;

PROMPT ===================================================
PROMPT 1. INITIALIZING SCHEMA AND SAMPLE DATA
PROMPT ===================================================
@schema.sql

PROMPT 
PROMPT ===================================================
PROMPT 2. DATA BEFORE EXECUTION
PROMPT ===================================================
PROMPT --- Accounts Table ---
SELECT AccountID, CustomerID, AccountType, Balance FROM Accounts;

PROMPT --- Employees Table ---
SELECT EmployeeID, Name, Department, Salary FROM Employees;

PROMPT 
PROMPT ===================================================
PROMPT 3. EXECUTING SCENARIO 1: PROCESS MONTHLY INTEREST
PROMPT ===================================================
@scenario1.sql

PROMPT 
PROMPT ===================================================
PROMPT 4. EXECUTING SCENARIO 2: UPDATE EMPLOYEE BONUS
PROMPT ===================================================
@scenario2.sql

PROMPT 
PROMPT ===================================================
PROMPT 5. EXECUTING SCENARIO 3: TRANSFER FUNDS
PROMPT ===================================================
@scenario3.sql

PROMPT 
PROMPT ===================================================
PROMPT 6. DATA AFTER EXECUTION
PROMPT ===================================================
PROMPT --- Accounts Table (After updates and transfer) ---
SELECT AccountID, CustomerID, AccountType, Balance FROM Accounts;

PROMPT --- Employees Table (After bonus updates) ---
SELECT EmployeeID, Name, Department, Salary FROM Employees;

PROMPT ===================================================
PROMPT END OF TEST SCRIPT
PROMPT ===================================================
