# Exercise 7: Financial Forecasting

This project demonstrates the implementation and analysis of recursive algorithms used to predict future financial values (like investment values) based on constant and varying growth rates.

---

## 1. Understanding Recursive Algorithms (Step 1)

### What is Recursion?
**Recursion** is a programming technique where a method calls itself to solve a smaller instance of the same problem. A recursive method typically consists of two main components:
1. **Base Case**: The condition under which the recursion terminates. Without a proper base case, the method would execute indefinitely, resulting in a stack overflow error.
2. **Recursive Case**: The part of the method where the problem is broken down into a smaller subproblem, and the method calls itself with the new input.

### How Recursion Simplifies Problems
Recursion is particularly powerful because it allows complex problems to be defined in terms of simpler sub-problems that share the same structure. It is highly beneficial for:
- **Divide and Conquer** algorithms (like Merge Sort or Quick Sort).
- **Tree and Graph Traversals** (where nodes naturally branch out).
- **Inductive Definitions**: Many mathematical functions (like factorials, Fibonacci numbers, and compound interest calculations) are naturally defined recursively, making their translation to code highly intuitive.

---

## 2. Project Structure (Step 2 & 3)

The project is structured as follows:
- `src/FinancialForecaster.java`: Contains the core forecasting methods (both recursive and iterative).
- `src/FinancialForecasterTest.java`: The test driver that executes and verifies different forecasting scenarios.

### Core Methods in `FinancialForecaster.java`

1. **Constant Growth Rate (`predictFutureValueConstant`)**:
   Calculates future value recursively using a fixed annual growth rate:
   \[
   FV(PV, r, t) = 
   \begin{cases} 
   PV & \text{if } t = 0 \\
   FV(PV \times (1 + r), r, t-1) & \text{if } t > 0 
   \end{cases}
   \]
2. **Varying Growth Rates (`predictFutureValueVarying`)**:
   Calculates future value recursively by applying an array of historical/past growth rates sequentially.
3. **Iterative Optimization (`predictFutureValueIterative`)**:
   An optimized iterative alternative to avoid stack overflow for large datasets.

---

## 3. Complexity Analysis (Step 4)

### Time Complexity
For both recursive algorithms (`predictFutureValueConstant` and `predictFutureValueVarying`):
- **Time Complexity**: \(O(N)\), where \(N\) is the number of periods (or length of the growth rates array).
- **Explanation**: The algorithm performs a constant number of operations (one multiplication and addition) per period and makes exactly one recursive call. Hence, the execution time grows linearly with the number of periods.

### Space Complexity
- **Space Complexity**: \(O(N)\) (due to call stack overhead).
- **Explanation**: Each recursive call adds a new stack frame to the call stack to keep track of its local variables and return address. For \(N\) periods, there will be \(N\) frames on the stack simultaneously before returning.

---

## 4. Optimization Strategies (Step 4)

### The Issue with Simple Recursion
In Java, standard JVMs do not automatically perform **Tail Call Optimization (TCO)**. Consequently, deep recursion (large \(N\)) will consume significant stack memory and eventually crash with a `java.lang.StackOverflowError`.

To avoid excessive stack and memory consumption, the following optimization techniques can be used:

### 1. Iteration (Loop-based approach)
Converting a tail-recursive algorithm into an iterative loop is the most effective optimization. It reduces the auxiliary space complexity from \(O(N)\) to \(O(1)\), as the loop uses a single stack frame and updates local variables in place.

*Comparison:*
```java
// Recursive: Space O(N)
double recursiveValue = predictFutureValueVarying(pv, rates, 0);

// Iterative: Space O(1)
double iterativeValue = predictFutureValueIterative(pv, rates);
```

### 2. Memoization / Dynamic Programming
If the recursive algorithm has **overlapping subproblems** (i.e., it computes the same subproblem multiple times), we can cache the results of previous computations. 
*While not necessary for simple future value forecasting (which has a single linear path), memoization is critical for branching financial models (e.g., option pricing models like binomial trees).*

---

## 5. Compilation and Execution

To compile the project, run the following command from the `FinancialForecasting` directory:
```bash
javac -d bin src/FinancialForecaster.java src/FinancialForecasterTest.java
```

To run the verification test suite:
```bash
java -cp bin FinancialForecasterTest
```
