@echo off
title ClientPulse AI - Local Production Server
color 0A
cd /d "D:\ClientPulse"

echo ====================================================
echo     ⚡ CLIENTPULSE AI - LAUNCHING LOCAL APP
echo ====================================================
echo.
echo Opening http://localhost:5173 in browser...
start http://localhost:5173
npm run dev
