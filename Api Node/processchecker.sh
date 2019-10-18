#!/bin/bash
while true; do
    # NODE
    if wget -O /dev/null http://62.210.72.103:8001/ >/dev/null
    then
        echo -e "\033[0;32m NODE SERVER is running\033[0m"
    else
        echo -e "\033[0;41m NODE SERVER STOPPED !\033[0m RESTART..."
        nohup npm start --prefix /home/Jimee-API-NodeJS/ &

        # mail
    fi

    # PYTHON
    if wget -O /dev/null http://localhost:40100/ >/dev/null
    then
        echo -e "\033[0;32m PYTHON SERVER is running\033[0m"
    else
        echo -e "\033[0;41m PYTHON SERVER STOPPED !\033[0m RESTART..."
        kill $(lsof -t -i:40100)
        nohup python3.6 /home/jimee/Jimee-Api-Python/Jimee/quickstart.py &

        # mail
    fi


    echo -e "\033[0m sleeping 30s..."
    sleep 30
done
