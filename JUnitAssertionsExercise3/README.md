# Exercise 3: Assertions in JUnit

This repository contains the solution for **Exercise 3: Assertions in JUnit** as part of the Java Full Stack Engineering (FSE) deepskilling program.

---

## 1. Project Directory Structure

```
JUnitAssertionsExercise3/
├── bin/                      # Compiled class files
├── lib/                      # External dependency JARs (JUnit 4 & Hamcrest)
│   ├── hamcrest-core-1.3.jar
│   └── junit-4.13.2.jar
├── src/                      # Java Source Code
│   └── AssertionsTest.java   # Exercise 3: JUnit Assertions Verification
├── README.md                 # Project documentation and guide
└── run_tests.bat             # Batch script to compile and run the assertions test
```

---

## 2. Exercise Solution

### Exercise 3: Assertions in JUnit
- **Logic**: Implements a dedicated test class [AssertionsTest.java](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/JUnitAssertionsExercise3/src/AssertionsTest.java) evaluating:
  - `assertEquals(expected, actual)`: Verifies math evaluation.
  - `assertTrue(condition)`: Confirms a condition evaluates to true.
  - `assertFalse(condition)`: Confirms a condition evaluates to false.
  - `assertNull(object)`: Confirms reference is null.
  - `assertNotNull(object)`: Confirms reference is not null.

```java
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;

public class AssertionsTest {
    @Test
    public void testAssertions() {
        assertEquals(5, 2 + 3);
        assertTrue(5 > 3);
        assertFalse(5 < 3);
        assertNull(null);
        assertNotNull(new Object());
    }
}
```

---

## 3. How to Run the Code

### Option 1: Run via Batch Script (Recommended)
1. Navigate to the `JUnitAssertionsExercise3` directory in your file explorer.
2. Double-click [run_tests.bat](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/JUnitAssertionsExercise3/run_tests.bat).
3. The command prompt will compile and run the JUnit assertions test.

### Option 2: Run via Terminal
1. Open a terminal or Command Prompt in the `JUnitAssertionsExercise3` directory.
2. Compile the classes:
   ```cmd
   javac -cp "lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" -d bin src/*.java
   ```
3. Run the test:
   ```cmd
   java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore AssertionsTest
   ```
