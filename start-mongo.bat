@echo off
echo Starting MongoDB service...
net start MongoDB
if %errorlevel% equ 0 (
    echo MongoDB started successfully!
) else (
    echo Failed to start MongoDB service.
    echo Make sure MongoDB is installed and try running as Administrator.
)
pause