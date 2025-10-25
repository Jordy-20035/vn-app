@echo off
echo Copying assets to public folder...
xcopy /E /I /Y src\assets\*.* public\assets\
echo Done!


