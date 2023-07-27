#!/usr/bin/env bash

cd ./packages/algokit-cli
poetry install --no-interaction
pyinstaller src/algokit/__main__.py --name algokit --onefile
cp ./dist/algokit.exe ../../bin/algokit.exe

