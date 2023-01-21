"use strict";
const readlineSync = require('readline-sync');

if(require.main == module) {
    const tasks = [];

    const menu = setInterval( () => {
        stampaMenu();
        let numero = readlineSync.question("Scelta?: ")

        switch(numero) {
            case '1':
                addTask(tasks);
                break;
            case '2':
                rimuoviTask(tasks);
                break;
            case '3':
                mostraTask(tasks);
                break;
            case '4':
                exit();
                clearInterval(menu);
        }

    },500);
}

function stampaMenu() {
    console.log("");
    console.log("1 - Inserisci un task");
    console.log("2 - Rimuovi un task");
    console.log("3 - Mostra tutti i task in ordine alfabetico");
    console.log("4 - Chiudi il programma");
}

function addTask(tasks) {
    let vero=true;
    let description = readlineSync.question("Inserisci descrizione: ");
    if(description!="" || description.length<2) vero=false;
    while(vero){
        let description = readlineSync.question("Inserisci descrizione (obbligatoria): ");
        if(description!="" || description.length<2) vero=false;
    }

    let valore = readlineSync.question("Importanza: ");
    if(valore=="") valore = "non importante";

    let privato = readlineSync.question("Privato o Condiviso: ");
    if(privato=="") privato = "privato";

    let data = readlineSync.question("Inserisci una data del task: (YYYY-MM-DD): ").trim();
    let deadline = new Date(data);

    console.log(deadline.getTime());
    console.log(deadline.getFullYear());
    console.log(deadline.getDay());
    console.log(deadline.getMonth());

    const task = {
        "descrizione" : description,
        "valore" : valore,
        "privato" : privato,
        "data" : deadline
    };

    tasks.push(task);
}

function rimuoviTask(tasks){
    let boolean=true;
    let cont=0;
    if(tasks.length<=0) console.log("Non sono presenti task da poter rimuovere");

    console.log("1- Elimina per descrizione");
    console.log("2- Elimina per data");
    const scelta = readlineSync.question("Scelta? :");

    if(scelta==1) {
        const descrizione = readlineSync.question("Digita la descrizione del task da rimuovere: ");
        if(descrizione!="" || descrizione.length<2) boolean=false;
        while(boolean){
            descrizione = readlineSync.question("Per cortesia digita la descrizione: ");
            if(descrizione!="" || descrizione.length>2) boolean=false;
        }
        for (const [i,e] of tasks.entries()){
            if(e["descrizione"]==descrizione){
                tasks.splice(i,1);
                console.log("Il task "+i+" è stato rimosso");
            }
        }
    }else{
        let data = readlineSync.question("Inserisci la data di scadenza: ");
        data = Date.parse(data);

        if(data!="") boolean=false;
        while(boolean){
            data = readlineSync.question("Inserisci la data per cortesia: ");
            if(data!="") boolean=false;
        }

        const filter = tasks.filter(scadenza => scadenza.data > data)//metto in filter solo quelli che non sono scaduti
        console.log(filter);

        let now = new Date();
        console.log(now);

        let orario = new Date(data);
        console.log(orario);
        console.log(now);

    }
    return tasks;
}
function exit() {
    console.log("Arrivederci..")
    return 0;
}

function mostraTask(tasks) {
    if(tasks.length<=0) {
        console.log("Non sono presenti tasks.");
        return;
    }

    const pippo = setInterval(() => {
        console.log("bella zio");
    },1000);

    console.log("");

    for(const [i,e] of tasks.entries()){
        console.log(i,e);
    }
}
