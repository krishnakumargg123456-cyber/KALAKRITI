$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " KALAKRITI Development Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

Write-Host "`nChecking Node.js..." -ForegroundColor Yellow
node --version

Write-Host "`nChecking npm..." -ForegroundColor Yellow
npm --version

Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
npm install

Write-Host "`nRunning production build..." -ForegroundColor Yellow
npm run build

Write-Host "`nFrontend setup completed." -ForegroundColor Green
