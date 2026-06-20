# Singleton Pattern Example

This project demonstrates the implementation of the **Singleton Design Pattern** in Java, as part of Exercise 1.

## Scenario
A logging utility class in an application needs to have exactly one instance throughout the application lifecycle to ensure consistent and unified logging.

## Project Structure
- `src/Logger.java`: The Singleton class that manages a single logging instance.
- `src/LoggerTest.java`: The test driver class to verify that only one instance of `Logger` is created and shared across the application.

## Design Details
1. **Private Static Instance Holder**: The single instance of `Logger` is kept inside a private static inner helper class (`LoggerHolder`).
2. **Private Constructor**: The constructor is marked as `private` to prevent other classes from instantiating it via the `new` operator.
3. **Global Access Point**: The public static method `getInstance()` provides access to the single instance. It uses the **Initialization-on-demand holder idiom (Bill Pugh Singleton)** to guarantee thread-safe lazy loading without the synchronized keyword overhead.

## Compilation and Execution

To compile the project, run the following command from the project root:
```bash
javac -d bin src/Logger.java src/LoggerTest.java
```

To run the test verification, run:
```bash
java -cp bin LoggerTest
```
