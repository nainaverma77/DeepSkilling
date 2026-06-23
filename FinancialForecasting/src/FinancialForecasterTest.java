/**
 * FinancialForecasterTest serves as the verification driver for the recursive and
 * iterative financial forecasting algorithms.
 */
public class FinancialForecasterTest {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       Financial Forecasting Verification         ");
        System.out.println("==================================================\n");

        double initialInvestment = 1000.0;

        // Test Scenario 1: Constant Growth Rate
        double constantRate = 0.05; // 5% annual growth
        int periods = 5;
        System.out.println("--- Scenario 1: Constant Growth Rate ---");
        System.out.printf("Initial Value: $%,.2f\n", initialInvestment);
        System.out.printf("Growth Rate:   %.1f%% per period\n", constantRate * 100);
        System.out.printf("Periods:       %d periods\n", periods);

        try {
            double constantFutureValue = FinancialForecaster.predictFutureValueConstant(initialInvestment, constantRate, periods);
            System.out.printf("Forecasted Future Value (Recursive): $%,.2f\n", constantFutureValue);

            // Mathematical verification: FV = PV * (1 + r)^t
            double expectedConstant = initialInvestment * Math.pow(1 + constantRate, periods);
            System.out.printf("Mathematical Expected Value:        $%,.2f\n", expectedConstant);
            System.out.printf("Discrepancy:                        $%.2e\n", Math.abs(constantFutureValue - expectedConstant));
        } catch (Exception e) {
            System.err.println("Scenario 1 Failed: " + e.getMessage());
        }
        System.out.println();

        // Test Scenario 2: Varying Growth Rates
        // Representing historical annual growth rates over the last 5 years: 3%, 5%, 4.5%, 6%, and 2.5%
        double[] growthRates = { 0.03, 0.05, 0.045, 0.06, 0.025 };
        System.out.println("--- Scenario 2: Varying Growth Rates ---");
        System.out.printf("Initial Value: $%,.2f\n", initialInvestment);
        System.out.print("Growth Rates per period: [");
        for (int i = 0; i < growthRates.length; i++) {
            System.out.printf("%.1f%%", growthRates[i] * 100);
            if (i < growthRates.length - 1) System.out.print(", ");
        }
        System.out.println("]");

        try {
            // 1. Recursive calculation
            double varyingFutureValueRecursive = FinancialForecaster.predictFutureValueVarying(initialInvestment, growthRates);
            System.out.printf("Forecasted Future Value (Recursive): $%,.2f\n", varyingFutureValueRecursive);

            // 2. Iterative calculation
            double varyingFutureValueIterative = FinancialForecaster.predictFutureValueIterative(initialInvestment, growthRates);
            System.out.printf("Forecasted Future Value (Iterative): $%,.2f\n", varyingFutureValueIterative);

            // Verification check
            double diff = Math.abs(varyingFutureValueRecursive - varyingFutureValueIterative);
            System.out.printf("Difference between Recursive and Iterative: $%.2e\n", diff);
            if (diff < 1e-9) {
                System.out.println("Verification Result: SUCCESS (Recursive and Iterative values match perfectly!)");
            } else {
                System.out.println("Verification Result: FAILURE (Mismatch detected)");
            }
        } catch (Exception e) {
            System.err.println("Scenario 2 Failed: " + e.getMessage());
        }
        System.out.println();

        // Test Scenario 3: Robustness and Error Handling
        System.out.println("--- Scenario 3: Robustness & Exception Handling ---");
        System.out.println("Testing negative periods:");
        try {
            FinancialForecaster.predictFutureValueConstant(initialInvestment, constantRate, -1);
            System.out.println("Result: [FAIL] Did not throw exception for negative periods.");
        } catch (IllegalArgumentException e) {
            System.out.println("Result: [SUCCESS] Caught expected exception: " + e.getMessage());
        }

        System.out.println("Testing null growth rates array:");
        try {
            FinancialForecaster.predictFutureValueVarying(initialInvestment, null);
            System.out.println("Result: [FAIL] Did not throw exception for null rates.");
        } catch (IllegalArgumentException e) {
            System.out.println("Result: [SUCCESS] Caught expected exception: " + e.getMessage());
        }

        System.out.println("\n==================================================");
        System.out.println("             Verification Complete                ");
        System.out.println("==================================================");
    }
}
