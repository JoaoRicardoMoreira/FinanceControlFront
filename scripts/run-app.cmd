@echo off
cd /d "%~dp0.."
echo Construindo app e iniciando em http://localhost:3000
call npm run app
pause
