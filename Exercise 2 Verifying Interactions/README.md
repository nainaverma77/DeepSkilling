# Exercise 2: Verifying Interactions

This project contains the solution for **Exercise 2: Verifying Interactions** using JUnit 5 and Mockito.

---

## 1. Project Directory Structure

```text
Exercise 2 Verifying Interactions/
├── bin/                              # Compiled class files
├── lib/                              # External dependency JARs (JUnit 5 & Mockito)
│   ├── apiguardian-api-1.1.2.jar
│   ├── byte-buddy-1.14.12.jar
│   ├── byte-buddy-agent-1.14.12.jar
│   ├── junit-jupiter-api-5.11.0.jar
│   ├── junit-jupiter-engine-5.11.0.jar
│   ├── junit-platform-commons-1.11.0.jar
│   ├── junit-platform-engine-1.11.0.jar
│   ├── junit-platform-launcher-1.11.0.jar
│   ├── junit-platform-console-standalone-1.11.0.jar
│   ├── mockito-core-5.11.0.jar
│   ├── objenesis-3.3.jar
│   └── opentest4j-1.3.0.jar
├── src/                              # Java Source Code
│   ├── ExternalApi.java              # The dependency interface to mock
│   ├── MyService.java                # Service under test that uses ExternalApi
│   └── MyServiceTest.java            # Unit tests using Mockito verifying interactions
├── .classpath                        # VS Code Java classpath configuration
├── .project                          # VS Code Java project configuration
├── README.md                         # Project documentation and guide
├── run_tests.ps1                     # PowerShell test runner script
└── run_tests.bat                     # Windows batch file to launch tests
```

---

## 2. Scenario Description

You need to ensure that a method is called with specific arguments (or verified that it was called). Mockito's `verify(...)` is used to check that specific methods were invoked on the mocked object.

### Steps Implemented
1. **Create a mock object**: Initialized a mock instance of `ExternalApi` using `Mockito.mock()`.
2. **Call the method**: Initialized `MyService` with the mocked API and invoked the service's `fetchData()` method, which in turn calls the mock's `getData()` method.
3. **Verify the interaction**: Used Mockito's static `verify(...)` method to assert that the `getData()` method on the mock was indeed called.

---

## 3. How to Run the Tests

Double-click `run_tests.bat` or run it from a terminal to compile the code and execute the test suite:
```cmd
run_tests.bat
```
