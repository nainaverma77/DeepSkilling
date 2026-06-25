// run_simulation.js
// A lightweight Node.js script that simulates the Oracle PL/SQL execution
// and verifies the stored procedures logic locally without requiring Oracle Database installed.

// 1. Initializing In-Memory DB State (Matching schema.sql)
const Customers = [
    { CustomerID: 1, Name: 'John Doe', Age: 35 },
    { CustomerID: 2, Name: 'Jane Smith', Age: 45 },
    { CustomerID: 3, Name: 'Bob Johnson', Age: 62 }
];

const Accounts = [
    { AccountID: 1, CustomerID: 1, AccountType: 'Savings', Balance: 5000.00 },
    { AccountID: 2, CustomerID: 1, AccountType: 'Checking', Balance: 1500.00 },
    { AccountID: 3, CustomerID: 2, AccountType: 'Savings', Balance: 12000.00 },
    { AccountID: 4, CustomerID: 3, AccountType: 'Checking', Balance: 8000.00 }
];

const Employees = [
    { EmployeeID: 1, Name: 'Alice Green', Department: 'IT', Salary: 60000.00 },
    { EmployeeID: 2, Name: 'Charlie Brown', Department: 'HR', Salary: 45000.00 },
    { EmployeeID: 3, Name: 'David White', Department: 'IT', Salary: 80000.00 },
    { EmployeeID: 4, Name: 'Eva Black', Department: 'Finance', Salary: 55000.00 }
];

function printTable(title, headers, rows) {
    console.log(`\n--- ${title} ---`);
    console.table(rows, headers);
}

// Stored Procedure 1: ProcessMonthlyInterest
function processMonthlyInterest() {
    console.log('Executing ProcessMonthlyInterest...');
    let count = 0;
    Accounts.forEach(acc => {
        if (acc.AccountType === 'Savings') {
            const oldBalance = acc.Balance;
            const interest = parseFloat((acc.Balance * 0.01).toFixed(2));
            acc.Balance = parseFloat((acc.Balance + interest).toFixed(2));
            console.log(`Account ID: ${acc.AccountID} | Old Balance: $${oldBalance.toFixed(2)} | Interest Credited: $${interest.toFixed(2)} | New Balance: $${acc.Balance.toFixed(2)}`);
            count++;
        }
    });
    console.log(`ProcessMonthlyInterest completed. Total savings accounts updated: ${count}`);
}

// Stored Procedure 2: UpdateEmployeeBonus
function updateEmployeeBonus(dept, bonusPercentage) {
    console.log(`Executing UpdateEmployeeBonus for Department: ${dept} with Bonus: ${bonusPercentage}%`);
    if (bonusPercentage < 0) {
        console.error(`ERROR: Bonus percentage cannot be negative.`);
        return;
    }
    let count = 0;
    Employees.forEach(emp => {
        if (emp.Department === dept) {
            const oldSalary = emp.Salary;
            const bonus = parseFloat((emp.Salary * (bonusPercentage / 100)).toFixed(2));
            emp.Salary = parseFloat((emp.Salary + bonus).toFixed(2));
            console.log(`Employee: ${emp.Name} (ID: ${emp.EmployeeID}) | Old Salary: $${oldSalary.toFixed(2)} | Bonus: $${bonus.toFixed(2)} | New Salary: $${emp.Salary.toFixed(2)}`);
            count++;
        }
    });
    if (count === 0) {
        console.log(`No employees found or updated in department: ${dept}`);
    } else {
        console.log(`UpdateEmployeeBonus completed successfully. Total employees updated: ${count}`);
    }
}

// Stored Procedure 3: TransferFunds
function transferFunds(sourceAccId, destAccId, amount) {
    console.log(`Executing TransferFunds: $${amount.toFixed(2)} from Account ${sourceAccId} to Account ${destAccId}`);
    
    if (amount <= 0) {
        console.log(`ERROR: Transfer amount must be greater than zero.`);
        return false;
    }
    if (sourceAccId === destAccId) {
        console.log(`ERROR: Source and destination accounts must be different.`);
        return false;
    }
    
    const sourceAcc = Accounts.find(acc => acc.AccountID === sourceAccId);
    if (!sourceAcc) {
        console.log(`ERROR: Source account ${sourceAccId} does not exist.`);
        return false;
    }
    
    const destAcc = Accounts.find(acc => acc.AccountID === destAccId);
    if (!destAcc) {
        console.log(`ERROR: Destination account ${destAccId} does not exist.`);
        return false;
    }
    
    if (sourceAcc.Balance < amount) {
        console.log(`ERROR: Insufficient balance. Source account balance: $${sourceAcc.Balance.toFixed(2)}, requested transfer: $${amount.toFixed(2)}`);
        return false;
    }
    
    sourceAcc.Balance = parseFloat((sourceAcc.Balance - amount).toFixed(2));
    destAcc.Balance = parseFloat((destAcc.Balance + amount).toFixed(2));
    console.log(`Successfully transferred $${amount.toFixed(2)} from Account ${sourceAccId} to Account ${destAccId}.`);
    return true;
}

function runSimulation() {
    console.log("===================================================");
    console.log("PL/SQL STORED PROCEDURES SIMULATION");
    console.log("===================================================");

    // 2. Display Initial Data
    printTable('Accounts (Before)', ['AccountID', 'CustomerID', 'AccountType', 'Balance'], Accounts);
    printTable('Employees (Before)', ['EmployeeID', 'Name', 'Department', 'Salary'], Employees);

    console.log("\n===================================================");
    console.log("3. EXECUTING SCENARIO 1: PROCESS MONTHLY INTEREST");
    console.log("===================================================");
    processMonthlyInterest();

    console.log("\n===================================================");
    console.log("4. EXECUTING SCENARIO 2: UPDATE EMPLOYEE BONUS");
    console.log("===================================================");
    updateEmployeeBonus('IT', 10);
    updateEmployeeBonus('HR', 5);
    updateEmployeeBonus('Marketing', 10);

    console.log("\n===================================================");
    console.log("5. EXECUTING SCENARIO 3: TRANSFER FUNDS");
    console.log("===================================================");
    console.log("--- Case 1: Valid Transfer ---");
    transferFunds(1, 2, 1000);

    console.log("\n--- Case 2: Insufficient Balance ---");
    transferFunds(2, 1, 10000);

    console.log("\n--- Case 3: Non-existent destination account ---");
    transferFunds(1, 999, 500);

    console.log("\n===================================================");
    console.log("6. DATA AFTER EXECUTION");
    console.log("===================================================");
    printTable('Accounts (After Updates & Transfer)', ['AccountID', 'CustomerID', 'AccountType', 'Balance'], Accounts);
    printTable('Employees (After Updates)', ['EmployeeID', 'Name', 'Department', 'Salary'], Employees);
    
    console.log("===================================================");
    console.log("SIMULATION RUN COMPLETED SUCCESSFULLY");
    console.log("===================================================");
}

runSimulation();
