# Exercise 4: Arrange-Act-Assert (AAA) Pattern & Test Fixtures

This repository contains the solution for **Exercise 4: Arrange-Act-Assert (AAA) Pattern, Test Fixtures, Setup and Teardown Methods in JUnit** as part of the Java Full Stack Engineering (FSE) deepskilling program.

---

## 1. Project Directory Structure

```
JUnitTestingExercise4/
├── bin/                      # Compiled class files
├── lib/                      # External dependency JARs (JUnit 4 & Hamcrest)
│   ├── hamcrest-core-1.3.jar
│   └── junit-4.13.2.jar
├── src/                      # Java Source Code
│   ├── Calculator.java       # Target class under test
│   └── CalculatorTest.java   # Exercise 4: Calculator test cases (AAA Pattern, Fixtures)
├── README.md                 # Project documentation and guide
└── run_tests.bat             # Batch script to compile and run all tests
```

---

## 2. Exercise Solution & Logic

### Setup (`@Before`) & Teardown (`@After`)
- **Setup (`@Before`)**: The `setUp` method instantiates a clean `Calculator` object before each test runs to guarantee a clean state.
- **Teardown (`@After`)**: The `tearDown` method de-allocates/nullifies the `Calculator` instance after each test executes to clean up resources.

### Arrange-Act-Assert (AAA) Structure
Each test method separates the test stages:
1. **Arrange**: Prepare input arguments, expectations, and test values.
2. **Act**: Invoke the method under test using the `Calculator` instance.
3. **Assert**: Verify that the actual result matches the expected result using assertions.

---

## 3. Implementation Code

### [CalculatorTest.java](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/JUnitTestingExercise4/src/CalculatorTest.java)

```java
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {

    private Calculator calculator;

    @Before
    public void setUp() {
        System.out.println("[SETUP] Initializing Calculator instance before test...");
        calculator = new Calculator();
    }

    @After
    public void tearDown() {
        System.out.println("[TEARDOWN] Cleaning up Calculator instance after test...\n");
        calculator = null;
    }

    @Test
    public void testAdd() {
        System.out.println("[TEST] Running testAdd...");
        // Arrange
        int a = 10;
        int b = 20;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(30, result);
        System.out.println("  Verified: " + a + " + " + b + " = " + result);
    }

    @Test
    public void testSubtract() {
        System.out.println("[TEST] Running testSubtract...");
        // Arrange
        int a = 50;
        int b = 15;

        // Act
        int result = calculator.subtract(a, b);

        // Assert
        assertEquals(35, result);
        System.out.println("  Verified: " + a + " - " + b + " = " + result);
    }

    @Test
    public void testMultiply() {
        System.out.println("[TEST] Running testMultiply...");
        // Arrange
        int a = 6;
        int b = 8;

        // Act
        int result = calculator.multiply(a, b);

        // Assert
        assertEquals(48, result);
        System.out.println("  Verified: " + a + " * " + b + " = " + result);
    }

    @Test
    public void testDivide() {
        System.out.println("[TEST] Running testDivide...");
        // Arrange
        int a = 100;
        int b = 5;

        // Act
        int result = calculator.divide(a, b);

        // Assert
        assertEquals(20, result);
        System.out.println("  Verified: " + a + " / " + b + " = " + result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDivideByZero() {
        System.out.println("[TEST] Running testDivideByZero (expecting exception)...");
        // Arrange
        int a = 10;
        int b = 0;

        // Act & Assert
        calculator.divide(a, b);
    }
}
```

---

## 4. How to Run the Code

### Option 1: Run via Batch Script (Recommended)
1. Navigate to the `JUnitTestingExercise4` directory in your file explorer.
2. Double-click [run_tests.bat](run_tests.bat).
3. The command prompt will automatically compile and run the JUnit assertions test.

### Option 2: Run via Terminal (PowerShell or Cmd)
1. Open a terminal or Command Prompt in the `JUnitTestingExercise4` directory.
2. Compile the classes:
   ```cmd
   javac -cp "lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" -d bin src/*.java
   ```
3. Run the test:
   ```cmd
   java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore CalculatorTest
   ```

---

## 5. Successful Execution Output

When you run the tests, you will see the following output:

```text
JUnit version 4.13.2
.[SETUP] Initializing Calculator instance before test...
[TEST] Running testDivideByZero (expecting exception)...
[TEARDOWN] Cleaning up Calculator instance after test...

.[SETUP] Initializing Calculator instance before test...
[TEST] Running testAdd...
  Verified: 10 + 20 = 30
[TEARDOWN] Cleaning up Calculator instance after test...

.[SETUP] Initializing Calculator instance before test...
[TEST] Running testSubtract...
  Verified: 50 - 15 = 35
[TEARDOWN] Cleaning up Calculator instance after test...

.[SETUP] Initializing Calculator instance before test...
[TEST] Running testDivide...
  Verified: 100 / 5 = 20
[TEARDOWN] Cleaning up Calculator instance after test...

.[SETUP] Initializing Calculator instance before test...
[TEST] Running testMultiply...
  Verified: 6 * 8 = 48
[TEARDOWN] Cleaning up Calculator instance after test...


Time: 0.025

OK (5 tests)
```
