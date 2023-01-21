"use strict";

class Engine{
    constructor() {
        this.function();        
    }

    function() {
        const t = document.querySelector('input[type="text"]"');

        t.addEventListener('input', event => {
            console.log('The current entered value is: ${t}');
            alert("bella zio");
            console.log("bellazio");
        });
    }
}