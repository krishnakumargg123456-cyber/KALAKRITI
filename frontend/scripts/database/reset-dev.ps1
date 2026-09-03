$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Red
Write-Host " KALAKRITI DEVELOPMENT RESET" -ForegroundColor Red
Write-Host "====================================" -ForegroundColor Red

Write-Host "`nThis script does NOT automatically drop the PostgreSQL database." -ForegroundColor Yellow
Write-Host "Use Alembic from the backend when a schema reset is intentionally required." -ForegroundColor Yellow

$backend = "C:\KALAKRITI\kalakriti\backend"

if (-not (Test-Path $backend)) {
    throw "Backend directory not found: $backend"
}

Set-Location $backend

if (-not (Test-Path ".venv\Scripts\python.exe")) {
    throw "Backend virtual environment not found."
}

& ".venv\Scripts\python.exe" -m alembic current

Write-Host "`nCurrent migration state displayed above." -ForegroundColor Green
