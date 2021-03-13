#!/bin/bash

echo NODE_ENV=${1}
source ./setup.sh ${1} 

if [ $1 = "development" ]; then
  echo PUBLIC_URL=/adn
fi;

if [ $1 = "production" ]; then
  echo PUBLIC_URL=/
fi;

react-scripts build