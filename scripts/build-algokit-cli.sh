#!/usr/bin/env bash

cd ./packages/algokit-cli
rm -rf ./dist
poetry install --no-interaction
pyinstaller src/algokit/__main__.py --name algokit-"$(uname -m)" --onefile
mkdir -p ../../bin/$OSTYPE
cp ./dist/algokit* ../../bin/$OSTYPE/
