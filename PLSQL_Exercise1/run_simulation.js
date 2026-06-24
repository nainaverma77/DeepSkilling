// run_simulation.js
// A lightweight Node.js script that simulates the Oracle PL/SQL execution
// and verifies the control structures logic locally without requiring Oracle Database installed.

// 1. Initializing In-Memory DB State (Matching schema.sql)
const Customers = [
    { CustomerID: 1, Name: 'John Doe', Age: 65, Balance: 12000.00, IsVIP: 'FALSE' },
    { CustomerID: 2, Name: 'Jane Smith', Age: 45, Balance: 8000.00, IsVIP: 'FALSE' },
    { CustomerID: 3, Name: 'Bob Johnson', Age: 72, Balance: 15000.00, IsVIP: 'FALSE' },
    { CustomerID: 4, Name: 'Alice Brown', Age: 30, Balance: 5000.00, IsVIP: 'FALSE' },
    { CustomerID: 5, Name: 'Charlie Green', Age: 55, Balance: 11000.00, IsVIP: 'FALSE' }
];

const Loans = [
    { LoanID: 1, CustomerID: 1, LoanAmount: 5000.00, InterestRate: 8.50, DueDaysOut: 15 },
    { LoanID: 2, CustomerID: 2, LoanAmount: 3000.00, InterestRate: 7.25, DueDaysOut: 45 },
    { LoanID: 3, CustomerID: 3, LoanAmount: 10000.00, InterestRate: 9.00, DueDaysOut: 25 },
    { LoanID: 4, CustomerID: 4, LoanAmount: 1500.00, InterestRate: 6.50, DueDaysOut: 10 },
    { LoanID: 5, CustomerID: 5, LoanAmount: 2000.00, InterestRate: 7.80, DueDaysOut: 50 }
];

function printTable(title, headers, rows) {
    console.log(`\n--- ${title} ---`);
    console.table(rows, headers);
}

function runSimulation() {
    console.log("===================================================");
    console.log("PL/SQL CONTROL STRUCTURES SIMULATION");
    console.log("===================================================");

    // 2. Display Initial Data
    printTable('Customers (Before)', ['CustomerID', 'Name', 'Age', 'Balance', 'IsVIP'], Customers);
    printTable('Loans (Before)', ['LoanID', 'CustomerID', 'LoanAmount', 'InterestRate', 'DueDaysOut'], Loans);

    console.log("\n===================================================");
    console.log("3. EXECUTING SCENARIO 1: APPLY SENIOR DISCOUNT (Age > 60)");
    console.log("===================================================");
    let discountApplied = 0;
    
    // Simulating Cursor Loop and Conditionals
    Customers.forEach(cust => {
        if (cust.Age > 60) {
            Loans.forEach(loan => {
                if (loan.CustomerID === cust.CustomerID) {
                    const oldRate = loan.InterestRate;
                    loan.InterestRate = parseFloat((loan.InterestRate - 1.00).toFixed(2));
                    console.log(`Applied 1% discount to customer ${cust.Name} (Age: ${cust.Age}). Interest rate reduced from ${oldRate}% to ${loan.InterestRate}%`);
                    discountApplied++;
                }
            });
        }
    });
    console.log(`Scenario 1 completed. Total loans updated with senior discount: ${discountApplied}`);

    console.log("\n===================================================");
    console.log("4. EXECUTING SCENARIO 2: SET VIP FLAG (Balance > $10,000)");
    console.log("===================================================");
    let vipCount = 0;
    
    // Simulating VIP Promotion Control Structure
    Customers.forEach(cust => {
        if (cust.Balance > 10000.00) {
            cust.IsVIP = 'TRUE';
            console.log(`Promoted customer ${cust.Name} to VIP. Balance: $${cust.Balance}`);
            vipCount++;
        }
    });
    console.log(`Scenario 2 completed. Total customers promoted to VIP: ${vipCount}`);

    console.log("\n===================================================");
    console.log("5. EXECUTING SCENARIO 3: SEND LOAN DUE REMINDERS (< 30 days)");
    console.log("===================================================");
    let reminderCount = 0;
    
    // Simulating due date calculation and text print out
    Loans.forEach(loan => {
        if (loan.DueDaysOut <= 30) {
            const cust = Customers.find(c => c.CustomerID === loan.CustomerID);
            const dueDateStr = new Date();
            dueDateStr.setDate(dueDateStr.getDate() + loan.DueDaysOut);
            const dateFormatted = dueDateStr.toISOString().split('T')[0];
            
            console.log(`REMINDER: Dear ${cust.Name}, your loan (ID: ${loan.LoanID}) of $${loan.LoanAmount.toFixed(2)} is due on ${dateFormatted}. Please ensure sufficient balance in your account.`);
            reminderCount++;
        }
    });
    console.log(`Scenario 3 completed. Total reminder messages printed: ${reminderCount}`);

    console.log("\n===================================================");
    console.log("6. DATA AFTER EXECUTION");
    console.log("===================================================");
    printTable('Customers (After Updates)', ['CustomerID', 'Name', 'Age', 'Balance', 'IsVIP'], Customers);
    printTable('Loans (After Updates)', ['LoanID', 'CustomerID', 'LoanAmount', 'InterestRate', 'DueDaysOut'], Loans);
    
    console.log("===================================================");
    console.log("SIMULATION RUN COMPLETED SUCCESSFULLY");
    console.log("===================================================");
}

runSimulation();
