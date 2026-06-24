-- test_all.sql
-- Master script to run schema setup and all scenarios in sequence

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
PROMPT --- Customers Table ---
SELECT CustomerID, Name, Age, Balance, IsVIP FROM Customers;

PROMPT --- Loans Table ---
SELECT LoanID, CustomerID, LoanAmount, InterestRate, DueDate FROM Loans;

PROMPT 
PROMPT ===================================================
PROMPT 3. EXECUTING SCENARIO 1: APPLY SENIOR DISCOUNT (Age > 60)
PROMPT ===================================================
@scenario1.sql

PROMPT 
PROMPT ===================================================
PROMPT 4. EXECUTING SCENARIO 2: SET VIP FLAG (Balance > $10,000)
PROMPT ===================================================
@scenario2.sql

PROMPT 
PROMPT ===================================================
PROMPT 5. EXECUTING SCENARIO 3: SEND LOAN DUE REMINDERS (< 30 days)
PROMPT ===================================================
@scenario3.sql

PROMPT 
PROMPT ===================================================
PROMPT 6. DATA AFTER EXECUTION
PROMPT ===================================================
PROMPT --- Customers Table (Updated VIP statuses) ---
SELECT CustomerID, Name, Age, Balance, IsVIP FROM Customers;

PROMPT --- Loans Table (Updated Interest Rates) ---
SELECT LoanID, CustomerID, LoanAmount, InterestRate, DueDate FROM Loans;

PROMPT ===================================================
PROMPT END OF TEST SCRIPT
PROMPT ===================================================
