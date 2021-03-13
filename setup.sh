#!/bin/bash

declare HTACCESS_FILE=.htaccess
declare ENV_DEVELOPMENT_SAMPLE_FILE=.env.development.sample
declare ENV_PRODUCTION_SAMPLE_FILE=.env.production.sample

if [ -f "${HTACCESS_FILE}" ]; then
    cp ${HTACCESS_FILE} public/${HTACCESS_FILE}
  else
    echo "Error: No existe el arrcivo ${HTACCESS_FILE}"
fi;

sleep 1

if [ $1 = "development" ]; then
  if [ -f ${ENV_DEVELOPMENT_SAMPLE_FILE} ]; then
    cp ${ENV_DEVELOPMENT_SAMPLE_FILE} .env.development
  else
    echo "Error: No existe el arrcivo ${ENV_DEVELOPMENT_SAMPLE_FILE}"
  fi
fi;

sleep 1

if [ $1 = "production" ]; then
  if [ -f ${ENV_PRODUCTION_SAMPLE_FILE} ]; then
    cp ${ENV_PRODUCTION_SAMPLE_FILE} .env.production
  else
    echo "Error: No existe el arrcivo ${ENV_PRODUCTION_SAMPLE_FILE}"
  fi
fi;

sleep 1

# echo "➜ Copy development files"
# sleep 1

# echo "➜ Copy production files"
# cp .env.production.sample .env.production
# sleep 1


# echo "Cloning ADN Greeanpeace Client"
# git clone https://github.com/GreenpeaceSkunk/adn-greenpeace-client
# sleep 5

# echo "Cloning ADN Greeanpeace Docker"
# git clone https://github.com/GreenpeaceSkunk/adn-greenpeace-docker
# sleep 5

# cp ./adn-greenpeace-docker/docker-compose-dist.yml docker-compose.yml
# docker-compose -f docker-compose.yml up --build --remove-orphans