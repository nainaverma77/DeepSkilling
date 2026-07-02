Write-Host "=================================================="
Write-Host "         LibraryManagement Spring Runner"
Write-Host "=================================================="
Write-Host ""

# Ensure working directory is the script's directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($scriptDir) { Set-Location $scriptDir }

# Step 1: Download Spring libraries if not present
if (-not (Test-Path lib)) {
    New-Item -ItemType Directory -Path lib | Out-Null
}

$springVersion = "5.3.30"
$dependencies = @(
    @{ Name = "spring-context"; Jar = "spring-context-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-context/$springVersion/spring-context-$springVersion.jar" },
    @{ Name = "spring-beans"; Jar = "spring-beans-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-beans/$springVersion/spring-beans-$springVersion.jar" },
    @{ Name = "spring-core"; Jar = "spring-core-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-core/$springVersion/spring-core-$springVersion.jar" },
    @{ Name = "spring-expression"; Jar = "spring-expression-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-expression/$springVersion/spring-expression-$springVersion.jar" },
    @{ Name = "spring-aop"; Jar = "spring-aop-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-aop/$springVersion/spring-aop-$springVersion.jar" },
    @{ Name = "spring-jcl"; Jar = "spring-jcl-$springVersion.jar"; Url = "https://repo1.maven.org/maven2/org/springframework/spring-jcl/$springVersion/spring-jcl-$springVersion.jar" }
)

foreach ($dep in $dependencies) {
    $dest = Join-Path "lib" $dep.Jar
    if (-not (Test-Path $dest)) {
        Write-Host "Downloading $($dep.Name)..."
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $dep.Url -OutFile $dest
    }
}

# Step 2: Compiling Java files
Write-Host "[STEP 1] Compiling Java classes..."
if (-not (Test-Path bin)) {
    New-Item -ItemType Directory -Path bin | Out-Null
}

# Compile source files
javac -cp "lib/*" -d bin src/main/java/com/library/repository/BookRepository.java src/main/java/com/library/service/BookService.java src/main/java/com/library/Main.java
if ($LASTEXITCODE -ne 0) {
    Write-Error "Compilation failed!"
    exit $LASTEXITCODE
}
Write-Host "[SUCCESS] Compilation complete."
Write-Host ""

# Copy resources (applicationContext.xml) to the bin folder so they are on classpath
Write-Host "[STEP 2] Copying configuration resources to classpath..."
Copy-Item -Path "src/main/resources/applicationContext.xml" -Destination "bin/" -Force
Write-Host "[SUCCESS] Resources copied."
Write-Host ""

# Step 3: Run the application
Write-Host "[STEP 3] Running com.library.Main..."
Write-Host "--------------------------------------------------"
java -cp "bin;lib/*" com.library.Main
Write-Host "--------------------------------------------------"
Write-Host "[SUCCESS] Execution complete."
