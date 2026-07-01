# Logging using SLF4J - Exercise 1

This project contains the solution for **Exercise 1: Logging Error Messages and Warning Levels** as part of the Java Full Stack Engineering (FSE) deepskilling program. It demonstrates setting up SLF4J and Logback dependencies in Maven's `pom.xml`, creating a logging configuration, and invoking logger endpoints for error and warning levels.

---

## 1. Project Directory Structure

```
LoggingExercise1/
├── bin/                      # Compiled class files
├── lib/                      # External dependency JARs (SLF4J & Logback)
│   ├── logback-classic-1.2.3.jar
│   ├── logback-core-1.2.3.jar
│   └── slf4j-api-1.7.30.jar
├── src/                      # Java Source Code
│   └── LoggingExample.java   # Demonstrates SLF4J error and warn logs
├── pom.xml                   # Maven project configuration file (dependencies)
├── README.md                 # Project documentation and guide
└── run_exercise.bat          # Batch script to download dependencies, compile and run
```

---

## 2. Exercise Solution & Implementation Details

### Exercise 1: Logging Error Messages and Warning Levels
**Problem**: Write a Java application that demonstrates logging error messages and warning levels using SLF4J.

- **Dependencies**: The Maven `pom.xml` configures:
  - `org.slf4j:slf4j-api:1.7.30` - The logging abstraction API.
  - `ch.qos.logback:logback-classic:1.2.3` - The concrete logging framework implementation conforming to SLF4J.
- **Java Class**: Implements [LoggingExample.java](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/LoggingExercise1/src/LoggingExample.java):
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample {
    private static final Logger logger = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {
        logger.error("This is an error message");
        logger.warn("This is a warning message");
    }
}
```

---

## 3. How to Run

1. Run the [run_exercise.bat](file:///c:/Users/naina/OneDrive/Desktop/DeekSkilling/LoggingExercise1/run_exercise.bat) script.
2. The script will automatically:
   - Download the required jar dependencies into the `lib` folder.
   - Compile the source files into the `bin` folder.
   - Run the compiled class using the downloaded jar libraries on the classpath.
