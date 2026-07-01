@echo off
echo ==================================================
echo         SLF4J Logging Exercise Runner
echo ==================================================
echo.

:: Ensure working directory is the batch file's directory
cd /d "%~dp0"

:: Create lib folder and download dependencies if not present
if not exist lib mkdir lib

if not exist lib\slf4j-api-1.7.30.jar (
    echo Downloading slf4j-api-1.7.30.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.30/slf4j-api-1.7.30.jar' -OutFile 'lib/slf4j-api-1.7.30.jar'"
)

if not exist lib\logback-core-1.2.3.jar (
    echo Downloading logback-core-1.2.3.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/ch/qos/logback/logback-core/1.2.3/logback-core-1.2.3.jar' -OutFile 'lib/logback-core-1.2.3.jar'"
)

if not exist lib\logback-classic-1.2.3.jar (
    echo Downloading logback-classic-1.2.3.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/ch/qos/logback/logback-classic/1.2.3/logback-classic-1.2.3.jar' -OutFile 'lib/logback-classic-1.2.3.jar'"
)

echo [STEP 1] Compiling Java logging class...
if not exist bin mkdir bin
javac -cp "lib/*" -d bin src/LoggingExample.java
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Compilation failed!
    pause
    exit /b %ERRORLEVEL%
)
echo [SUCCESS] Compilation complete.
echo.

echo [STEP 2] Running LoggingExample...
echo --------------------------------------------------
java -cp "bin;lib/*" LoggingExample
echo --------------------------------------------------
echo [SUCCESS] Run complete.
echo.
pause
