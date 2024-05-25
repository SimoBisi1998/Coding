#!/bin/bash

# Assicurati di avere Mono installato
if ! command -v mono &> /dev/null
then
    echo "Mono non è installato. Installalo prima di eseguire questo script."
    exit
fi

# Esegui l'eseguibile .exe con Mono
mono /Users/simobisi/Desktop/SistemiDistribuiti/MulticastReceiver/MulticastReceiver/bin/Debug/MulticastReceiver.exe
