@echo off
echo ==================================================
echo         JUnit Assertions Exercise Runner
echo ==================================================
echo.

:: Ensure working directory is the batch file's directory
cd /d "%~dp0"

echo [STEP 1] Compiling Java classes and tests...
if not exist bin mkdir bin
javac -cp "lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" -d bin src/*.java
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Compilation failed!
    pause
    exit /b %ERRORLEVEL%
)
echo [SUCCESS] Compilation complete.
echo.

echo [STEP 2] Running JUnit Tests (org.junit.runner.JUnitCore)...
echo --------------------------------------------------
java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore AssertionsTest
echo --------------------------------------------------
echo [SUCCESS] Test run complete.
echo.
pause
