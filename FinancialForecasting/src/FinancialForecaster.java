/**
 * FinancialForecaster provides methods to predict the future value of an investment/asset
 * using recursive and iterative algorithms.
 */
public class FinancialForecaster {

    /**
     * Predicts future value recursively using a CONSTANT growth rate.
     * 
     * Formula:
     * FV(t) = FV(t-1) * (1 + r)
     * Base Case: FV(0) = PV (Present Value)
     * 
     * @param currentValue The initial value or present value (PV).
     * @param growthRate   The constant growth rate per period (e.g., 0.05 for 5%).
     * @param periods      The number of periods to forecast into the future.
     * @return The predicted future value.
     */
    public static double predictFutureValueConstant(double currentValue, double growthRate, int periods) {
        if (periods < 0) {
            throw new IllegalArgumentException("Periods cannot be negative.");
        }
        // Base Case: 0 periods remaining, return the current accumulated value
        if (periods == 0) {
            return currentValue;
        }
        // Recursive Case: Apply interest for one period and decrement periods
        double nextValue = currentValue * (1 + growthRate);
        return predictFutureValueConstant(nextValue, growthRate, periods - 1);
    }

    /**
     * Predicts future value recursively using VARYING growth rates.
     * This method applies a sequence of historical or forecasted growth rates period-by-period.
     * 
     * Formula:
     * FV(i) = FV(i-1) * (1 + growthRates[i-1])
     * Base Case: i reaches the end of the growthRates array.
     * 
     * @param currentValue The value at the start of the current period.
     * @param growthRates  An array of growth rates for each period.
     * @param index        The current index of the growth rate to apply.
     * @return The predicted future value after applying all growth rates.
     */
    public static double predictFutureValueVarying(double currentValue, double[] growthRates, int index) {
        if (growthRates == null) {
            throw new IllegalArgumentException("Growth rates array cannot be null.");
        }
        if (index < 0) {
            throw new IllegalArgumentException("Index cannot be negative.");
        }
        // Base Case: all growth rates have been applied
        if (index >= growthRates.length) {
            return currentValue;
        }
        // Recursive Case: Apply the current period's growth rate and move to the next index
        double nextValue = currentValue * (1 + growthRates[index]);
        return predictFutureValueVarying(nextValue, growthRates, index + 1);
    }

    /**
     * Helper method to call the varying growth rates recursive algorithm starting from index 0.
     * 
     * @param currentValue The initial value or present value (PV).
     * @param growthRates  An array of growth rates for each period.
     * @return The predicted future value.
     */
    public static double predictFutureValueVarying(double currentValue, double[] growthRates) {
        return predictFutureValueVarying(currentValue, growthRates, 0);
    }

    /**
     * Predicts future value ITERATIVELY using varying growth rates.
     * This is the optimized version that avoids call stack overhead, achieving O(1) auxiliary space.
     * 
     * @param currentValue The initial value or present value (PV).
     * @param growthRates  An array of growth rates for each period.
     * @return The predicted future value.
     */
    public static double predictFutureValueIterative(double currentValue, double[] growthRates) {
        if (growthRates == null) {
            throw new IllegalArgumentException("Growth rates array cannot be null.");
        }
        double value = currentValue;
        for (double rate : growthRates) {
            value *= (1 + rate);
        }
        return value;
    }
}
