@echo off
REM ==== Fitness Temple - Start website in the background (survives closing this window) ====
cd /d "%~dp0"
echo Starting Fitness Temple in the background...
call pnpm start:bg
echo.
pause