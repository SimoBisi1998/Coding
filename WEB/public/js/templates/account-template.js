"use strict";

function showAccount(nome,cognome,email,ruolo) {
    return `
    <table class="table table-borderless list">
        <tr>
            <td>Nome</td>
            <td>${nome}</td>
        </tr>
        <tr>
            <td>Cognome</td>
            <td>${cognome}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Ruolo</td>
            <td>${ruolo}</td>
        </tr>
    </table>`;
}
export {showAccount};