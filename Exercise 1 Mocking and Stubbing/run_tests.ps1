Write-Host "=================================================="
Write-Host "         JUnit 5 and Mockito Exercise Runner"
Write-Host "=================================================="
Write-Host ""

# Ensure working directory is the script's directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($scriptDir) { Set-Location $scriptDir }

# Step 1: Compilation
Write-Host "[STEP 1] Compiling Java classes and tests..."
if (-not (Test-Path bin)) {
    New-Item -ItemType Directory -Path bin | Out-Null
}

# Compile all source files
javac -cp "lib/*" -d bin src/*.java
if ($LASTEXITCODE -ne 0) {
    Write-Error "Compilation failed!"
    exit $LASTEXITCODE
}
Write-Host "[SUCCESS] Compilation complete."
Write-Host ""

# Step 2: Build classpath and run tests
Write-Host "[STEP 2] Running JUnit Tests (Console Launcher)..."
Write-Host "--------------------------------------------------"

# Dynamically resolve and join all jar file paths for classpath
$jarFiles = Get-ChildItem lib/*.jar | Select-Object -ExpandProperty FullName
$cp = "bin;" + ($jarFiles -join ";")

# Execute JUnit Console Launcher
java "-Dnet.bytebuddy.experimental=true" -jar lib/junit-platform-console-standalone-1.11.0.jar execute -cp $cp --select-class MyServiceTest --details=summary --disable-ansi-colors

Write-Host "--------------------------------------------------"
Write-Host "[SUCCESS] Test run complete."
Write-Host ""
