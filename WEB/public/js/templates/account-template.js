"use strict";

function showAccount(nome,cognome,email,ruolo) {
    return `
    <header>
    <h1><b>Informazioni Personali</b></h1>
    </header>
    <div id="information-container">
        <div id="personal-information">
            <p><i><b>Nome</b></i></p>
            <p>${nome}</p>
            <br>
            <p><i><b>Cognome</b></i></p>
            <p>${cognome}</p>
            <br>
            <p><i><b>E-mail</b></i></p>
            <p>${email}</p>
            <br>
            <p><i><b>Ruolo</b></i></p>
            <p>${ruolo}</p>
        </div>
        <div>
            <img src="../../images/account-icon.png">
        </div>
    </div>`;
}
export {showAccount};