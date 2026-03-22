#!/usr/bin/env pwsh
#
# CleanSL Admin Dashboard - Windows PowerShell Quick Start
#

Write-Host "`n" -ForegroundColor White
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  CleanSL Admin Dashboard - Complete Setup & Launch    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install from https://nodejs.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check MongoDB
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($null -eq $mongoProcess) {
    Write-Host "`n⚠️  MongoDB may not be running" -ForegroundColor Yellow
    Write-Host "To start MongoDB:" -ForegroundColor Yellow
    Write-Host "  1. Open Services (services.msc)" -ForegroundColor White
    Write-Host "  2. Find 'MongoDB Server' and click Start" -ForegroundColor White
    Write-Host "  OR run: mongod" -ForegroundColor White
    $continue = Read-Host "`nContinue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
} else {
    Write-Host "`n✅ MongoDB is running" -ForegroundColor Green
}

Write-Host "`n📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend setup failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n📦 Installing Backend Dependencies..." -ForegroundColor Cyan
Push-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend setup failed" -ForegroundColor Red
    Pop-Location
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n🌱 Seeding Database..." -ForegroundColor Cyan
npm run seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Database seeding failed (this is OK if data already exists)" -ForegroundColor Yellow
}

Pop-Location

Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n🚀 Ready to Start!" -ForegroundColor Green
Write-Host "`nChoose an option:" -ForegroundColor White
Write-Host "  1) Start Both (Backend + Frontend)" -ForegroundColor White
Write-Host "  2) Start Backend Only (Port 5000)" -ForegroundColor White
Write-Host "  3) Start Frontend Only (Port 3000)" -ForegroundColor White
Write-Host "  4) Exit" -ForegroundColor White
Write-Host "`n"

$choice = Read-Host "Enter choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Starting Backend..." -ForegroundColor Cyan
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
        Start-Sleep -Seconds 3
        Write-Host "🚀 Starting Frontend..." -ForegroundColor Cyan
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm start"
        Write-Host "`n✅ Services starting:" -ForegroundColor Green
        Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
        Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
        Write-Host "   API Docs: http://localhost:5000/api" -ForegroundColor White
    }
    "2" {
        Write-Host "`n🚀 Starting Backend on port 5000..." -ForegroundColor Cyan
        Set-Location backend
        npm run dev
    }
    "3" {
        Write-Host "`n🚀 Starting Frontend on port 3000..." -ForegroundColor Cyan
        npm start
    }
    "4" {
        Write-Host "`nGoodbye!" -ForegroundColor Green
        exit 0
    }
    default {
        Write-Host "`n❌ Invalid choice" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}
