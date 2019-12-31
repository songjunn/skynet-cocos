@echo off

@set SRC_DIR=.
@set DES_DIR=../../assets/script/message

cd %SRC_DIR%

for /f "delims=" %%i in ('dir /b /a-h "*.proto"') do (call protoc.exe --js_out=import_style=commonjs,binary:%DES_DIR% %%i)

@pause