@echo off
echo Starting AppFood development server...
echo.
echo This will install dependencies if needed and start the server.
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting server...
echo.
echo The application will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server.
echo.

npm start
