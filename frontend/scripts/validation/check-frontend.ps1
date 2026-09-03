$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " KALAKRITI Frontend Validation" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

if (-not (Test-Path "package.json")) {
    throw "package.json not found. Run this script from the frontend root."
}

Write-Host "`nRunning TypeScript/build validation..." -ForegroundColor Yellow

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "Frontend validation failed."
}

Write-Host "`nFrontend validation completed successfully." -ForegroundColor Green
