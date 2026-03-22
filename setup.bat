@echo off
echo ========================================
echo CleanSL Admin - Backend Setup
echo ========================================
echo.
echo Installing dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Seeding database with sample data...
call npm run seed
if errorlevel 1 (
    echo Warning: Database seeding failed (MongoDB might not be running)
    echo Please ensure MongoDB is running and try again
    pause
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the backend:
echo   cd backend
echo   npm run dev
echo.
echo To start the frontend:
echo   cd cleansl-admin
echo   npm start
echo.
pause
