IF [%1]==[] GOTO quit
IF [%2]==[] GOTO quit
IF [%3]==[] GOTO quit
SET user=%1
SET rhost=%2
SET dpath=%3
PLINK.EXE -batch -ssh %user%@%rhost% rm -rf %dpath%*
PSCP.EXE -r .\dist\urgence-environnement\ %user%@%rhost%:%dpath%

:quit
EXIT /B 1