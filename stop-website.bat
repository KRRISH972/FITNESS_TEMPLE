@echo off
REM ==== Fitness Temple - Stop the background website service ====
cd /d "%~dp0"
call pnpm stop
echo.
pause