"use strict";

//per inserire input
const readlineSync = require('readline-sync');

let username = readlineSync.question("bella");
console.log(username);

let array=["alessandro","lorenzo","simone","luca","w"];
let nomi = [];
for(const [indice,elemento] of array.entries()){
    nomi[indice] = elemento.trim();
}
const ritornaStringa = (nomi) => {
    let newArray=[];
    let i=0;
    
    for(const x of nomi) {
        if (x.length>=2) {
            let size = x.length;
            nomi[i]=x[0]+x[1]+x[size-2]+x[size-1];
            i++;
        }else nomi[i]="";
    }
    return nomi;
};

let stringa = ritornaStringa(nomi);

for(let i=0;i<nomi.length;i++) {
    console.log(stringa[i]);
    if(stringa[i]=="") console.log("Parola con meno di due caratteri");
}


