"use strict";

let array=[];

for(let i=0;i<5;i++) {
    array[i] = Math.floor(Math.random()*(30-18+1)+18);;
}
let copiaArray = Array.from(array);

function rimuoviMin(copiaArray) {

    let min1=100;
    let min2=100;
    let index1=0;
    let index2=0;
    console.log("Array iniziale: ->  " +copiaArray);

    for(let i=0;i<copiaArray.length;i++){
        if(copiaArray[i]<min1){
            min1 = copiaArray[i];
            index1 = i;
        }
    }
    copiaArray.splice(index1,1);
    for(let i=0;i<copiaArray.length;i++){
        if(copiaArray[i]<min2){
            min2 = copiaArray[i];
            index2 = i;
        }
    }
    copiaArray.splice(index2,1);
    console.log("Array senza due minimi: ->  " +copiaArray);
    console.log("Valore min1: "+min1+"\nValore min2: "+min2);
    aggiungiDuali(copiaArray,min1,min2);
}

function aggiungiDuali(newArray,min1,min2){
    if(min1==24) newArray.push(24);
    if(min2==24) newArray.push(24);

    if(min1<24) {
        let x = min1-18;
        newArray.push(30-x);
        console.log("Duale di min1: "+(30-x));
    }
    if(min1>24) {
        let x = 30-min1;
        newArray.push(18+x);
        console.log("Duale di min1: "+(18+x));
    }
    if(min2<24) {
        let x = min2-18;
        newArray.push(30-x);
        console.log("Duale di min2: "+(30-x));
    }
    if(min2>24) {
        let x = 30-min2;
        newArray.push(18+x);
        console.log("Duale di min2: "+(18+x));
    }
    console.log("Array DEFINITIVO: "+newArray);
}
rimuoviMin(copiaArray);

// lista dei nostri corsi
const lista = `Metodologie di programmazione per il Web, Reti 1,
 Paradigmi di programmazione, Sistemi operativi, Basi di dati e sistemi informativi`;

const corsi = lista.split(",");

for(const [i,elemento] of corsi.entries()){
    corsi[i] = elemento.trim();
}

const newArray= [];

for(const corso of corsi){
    let acronimo="";
    let parola = corso.split(' ');
    
    for(const x of parola){
        acronimo+=x[0].toUpperCase();
    }
    newArray.push(acronimo);
}

const output=[];
//carico output con gli acronomi collegati ai corsi
for(const [i,c] of newArray.entries()){
    output.push(`${c} - ${corsi[i]}`);
}

console.log(output.sort());

let punto = {
    x : 5,
    y : 6,
    zio : [12,23]
}
/*console.log(punto);
console.log(punto["y"]);
console.log(punto.y);
*/
for(const x in punto) {
    //onsole.log(`${x} = ${punto[x]}`);
    //console.log(x);
    //console.log(punto[x]);
}


//restituisce in un array le chiavi di un oggetto
let keys = Object.keys(punto);
console.log(keys);

//restituisce in un array coppie chiave valore
let key_values = Object.entries(punto);
console.log(key_values);

//assegnamento 1 -> puntano alla stessa zona di memoria
let punto2 = punto

//assegnamento 2 -> nuova cella di memoria come con Array.from
let punto3 = Object.assign({},punto); //assegno il contenuto di punto ad un oggetto vuoto(primo elemento corrisponde all'inizializzazione di un dizionario vuoto).
//posso aggiungere più target (ossia più oggetti a cui assegnare)

let book = {
    author : "Enrico",
    pages : 340
};

//assegna a book2 l'oggetto book e ad entrambi aggiunge il nuovo campo title, poichè la destinazione è anche book),quest oggetto book2 punta alla stessa zona di memoria di book quindi non fa effettivamente una copia 
let book2 = Object.assign(book,{title : "js"}); 

//creo un nuovo oggetto pippo2 con una nuova zona di memoria ed assegno ad entrambi il nuovo campo, poichè come destinazione ho un oggetto vuoto({}) e l'oggetto pippo
let pippo = {
    author : "Zio",
    pages : 230
}

let pippo2 = Object.assign({},pippo,{title : "js"});


//copia in un oggetto i campi e i valori di un oggetto già esistente da ES9

let ciao = {
    author : "Zio",
    pages : 230
}

//let ciao2 = [...ciao,{title : "js"}]; //creo ciao2 e gli metto dentro tutti i campi di ciao più la chiave title con il suo valore 

//creo oggetto a cui assegno ad others i campi che vanno da c in poi
const {a,b,...others} = {
    a : 1,
    b : 2,
    c : 3,
    d : 4
} 

const kap = {
    a : 2, 
    c : 5,
    z : 1,
    "pippo" : "bella"
}

console.log('a' in kap); //per verificare se esiste il campo a in kap

//come dichiarare una funziona con l'arrow
const fn = (params) => {
};

let arrow = x => x*x; //come se dichiarassi una funzione arrow dove sommo due volte x

//funzioni annidate dove calcolo il prodotto di un valore in una funzione calcola e ricorsivamente lo passo alla funzione calcola
function ipotenusa(a,b) {
    const calcola = x => x*x;
    return calcola(a)+calcola(b);
}

// ho una nested function in questo caso, non posso utilizzare le variabili della funzione interna in quella esterna, ma viceversa si. Infatti non posso stampare c2 in esempio
function esempio() {
    const c = "bella";

    const pippo = () => {
        let c2 = "zio"
        console.log(c);
    }
    console.log("weee");
    //console.log(c2);
}
esempio();

//funzione interna accessibile anche dopo aver terminato l'esecuzione della funzione esterna,ritornando la funzione interna da quella esterna
function greeter(name) {
    const myname = name;

    const hello = () => {
        return "Hello "+myname;
    }

    return hello;
}

const ciaoTom = greeter("Tom");
console.log(ciaoTom());


//funzione interna che ritorna una o più funzioni,dove creo l'oggetto c che ritorna il valore di counter a cui col punto posso accedere a una delle funzioni di ritorno
function counter() {
    let n = 0;

    return {
        count : function(){
            return n++;
        },
        reset : function() {
            return n=0;
        }
    }
}

let c = counter();
let d = counter();
c.count();

//riordino array tramite callback
var numbers = [4,2,5,1,3];

numbers.sort(function(a,b) {
    return a-b;
});

console.log(numbers);


//callbacks, quando chiamo la seconda funzione e gli passo greeting è come se passassi la funzione come parametro alla funzione process
//in questo modo quando arriverò a "callback(name)" qui partirà la chiamata a greeter il quale stamperà a schermo il nome

function greeter2(name) {
    console.log('HELLO ' +name);
}

function processUserInput(callback){
    var name = "simo";
    callback(name);
    //console.log("we");
}

processUserInput(greeter2);

//filter crea un nuovo array con tutti gli elementi per cui la callback ritorna true
const market = [
    { name: 'GOOG', var: -3.2 },
    { name: 'AMZN', var:  2.2 },
    { name: 'MSFT', var: -1.8 }
  ];
  const bad = market.filter(stock => stock.var < 0);
  // [ { name: 'GOOG', var: -3.2 }, { name: 'MSFT', var: -1.8 } ]
  const good = market.filter(stock => stock.var > 0);
  // [ { name: 'AMZN', var: 2.2 } ]



//callback asincrona col timer/date
/*const onesec = setTimeout( () => {
    console.log("bella bro");
},1000);

console.log("hi");
*/
//callback asincrona col timer setInterval, stampo simo ogni 2 secondi

const id = setInterval( () => {
    console.log("simo");
},2000);

console.log(id);
clearInterval(id);//serve per stoppare il setInterval


const { fstat } = require('fs');
//readline asincrona(non bloccante)

const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question('Task description: ', (answer)=> {
    let description = answer;
    r1.close();
    console.log("Ecco");
});

console.log("");
console.log("bella zio");//viene eseguito subito dopo r1,cosiì r1 non blocca il programma per chiedere l'input


//gestire errori con una callback
fs.readFile('/file.json', (err,data) => {
    if(err!==null){
        console.log(err);
        return;
    }
    //apertura corretta del file
    console.log(data);
});

//promesse mantenute o no con resolve e reject
let duration = 10;
const waitPromise = new Promise((resolve,reject) => {
    if(duration>=0) {
        //la promessa è stata mantenuta
        resolve("It works");
    }else {
        reject(new Error("It doesn't work"));
    }
});

waitPromise.then((result) => {
    console.log("Success: ",result);
}).catch((error) => {
    console.log("Error: ",error);
});

//posso passargli anche una funzione,esempio: wait(1000).then;

//una concatenazione di promise

getRepoInfo() 
    .then(repo => getIssue(repo))
    .then(issue => getOwner(issue.ownderId))
    .then(owner => sendEmail(owner.email,'Some text'))



//eseguire promise in parallelo

Promise.all(promises)//promises è un array di promises, non per forza tutti gli elementi devono essere promise
    .then(results => console.log(results));

//quando la prima delle promise nell'array diventa fullfilled o reject (quindi la prima che finisce)
Promise.race();

//Con ES8 introdotti async e await, async keyword da mettere prima di ogni funzione in cui vogliamo che questa funzione ritorni una promise
const sayHello = async() => "hello";
sayHello.then(console.log); //this will log "hello"

//await prende la promise(messa in una variabile) e ritorna fullfilled oppure genera un'eccezione
const greetings = await sayHello();
//dev'essere in un blocco che utilizza async,devono essere usati in coppia

//ESEMPIO PROMISE
function resolveAfter2seconds() {
    return new Promise(resolve => { //c'è solo un parametro resolve ma non è un problema(non gestisce reject in questo caso ritorna undefined)
        setTimeout(() => {
            resolve('resolved');
        },2000);
    });
}

async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2seconds();//gestire questa funzione in modo asincrono 
    console.log(result);
}
asyncCall();

//altri esempi
const makeRequest = async() => {
    console.log(await getAPIData());
    return "done";
}

let res = makeRequest();


//chain di async e await
async function getData() {
    const issue = await getIssue();
    const owner = await getOwner(issue.ownerId);
    await sendEmail(owner.email,'Some text');
};


//PROGRAMMAZIONE FUNZIONALE

//array letters generato con lo spread (0: h, 1: e, 2: l ecc..)
const letters = [..."Hello word"];
let uppercase = "";
letters.forEach(letter => { //per ogni elemento di letters, lo metto maiuscolo,foreach non muta l'array
    uppercase += letter.toUpperCase();
});

console.log(uppercase); //HELLO WORLD


//every, qui tutti devono rispettare la condizione
let p = [1,2,3,4,5];
p.every(x => x<10); //true if all values are <10
p.every(x=> x%2 === 0) //false

//some se almeno un elemento che rispetta la condizione
p = [1,2,3,4,5];
p.some( x => x%2===0);
p.some(isNaN);

//map ritorna un nuovo array che contiene solo i valori che rispettano la condizione
const t = [1,2,3];
b = t.map(x => x*x); //x è un parametro che viene letto da t e all'interno dell'arrow(che è come se fosse una funzione) viene moltiplicato
console.log(b); // [1,4,9]

//filter, ritorna un array
const q = [5,4,3,2,1];
q.filter(x => x<3); //genera [2,1] come valori minori di 3
q.filter((element,index) => index%2==0); //[5,3,1]

//reduce combina elementi di un array per produrre un singolo valore(che prende una funzione e un parametro(opzionale da passare alla funzione))
const y = [5,4,3,2,1];
y.reduce((accumulator,currentValue) => accumulator+currrentValue,0); //=> 15; the sum of values, currentValue è l'lemento dell'array menter l'accumulatore è la somma (es: 5+0, 5+4, 9+3 ecc..). l'accumulatore parte da zero in questo caso come valore di default
y.reduce((acc,val) => acc*val,1); //=> 120; the product of values
y.reduce((acc,val) => (acc > val) ? acc : val); // =>5; the largest of the values //qua non c'è un valore iniziale quindi come primo elemento prende 5 l'accumulatore
//5 > 5? no quindi ad acc assegno val e lo ritorno(quindi acc=5), 5 > 4? si quindi non eseguo 'acc : val'
