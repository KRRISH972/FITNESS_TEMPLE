@echo off
REM ==== Fitness Temple - auto start after Windows login (scheduled task) ====
cd /d "C:\Users\dhima\OneDrive\Documents\FITNESS_TEMPLE"

REM wait for the system to finish booting / network to be ready
ping -n 6 127.0.0.1 >nul

REM start (or restart) the website service in background
call "C:\Users\dhima\AppData\Roaming\npm\pm2.cmd" startOrRestart "ecosystem.config.cjs" --update-env >nul 2>&1
call "C:\Users\dhima\AppData\Roaming\npm\pm2.cmd" save >nul 2>&1