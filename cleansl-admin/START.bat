@echo off
REM CleanSL Admin Dashboard - Windows Quick Start Script

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  CleanSL Admin Dashboard - Complete Setup & Launch    ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version
echo.

REM Check if MongoDB is running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB may not be running
    echo Try these steps:
    echo 1. Open Services (services.msc)
    echo 2. Find and start "MongoDB"
    echo OR
    echo 3. Run: mongod
    echo.
    set /p continue="Continue anyway? (y/n): "
    if /i not "%continue%"=="y" exit /b 1
)

echo.
echo 📦 Installing Frontend Dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo 📦 Installing Backend Dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo 🌱 Seeding Database...
call npm run seed

if %errorlevel% neq 0 (
    echo ⚠️  Warning: Database seeding failed (this is OK if data exists)
)

cd ..

echo.
echo ════════════════════════════════════════════════════════
echo.
echo 🚀 Ready to Start!
echo.
echo Would you like to:
echo 1) Start Both (Backend + Frontend)
echo 2) Start Backend Only
echo 3) Start Frontend Only
echo 4) Exit
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting Backend on port 5000...
    start cmd /k "cd backend && npm run dev"
    timeout /t 3 /nobreak
    echo.
    echo Starting Frontend on port 3000...
    start cmd /k "npm start"
    echo.
    echo ✅ Both services starting...
    echo   Frontend: http://localhost:3000
    echo   Backend:  http://localhost:5000
    echo   API Docs: http://localhost:5000/api
)

if "%choice%"=="2" (
    echo.
    echo Starting Backend on port 5000...
    cd backend
    npm run dev
)

if "%choice%"=="3" (
    echo.
    echo Starting Frontend on port 3000...
    npm start
)

if "%choice%"=="4" (
    echo Goodbye!
    exit /b 0
)

pause
