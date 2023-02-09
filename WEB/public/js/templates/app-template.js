"use strict";


function createEmptyApp() {
    return `<h1>NON SONO STATI TROVATI PROGETTI</h1>`;
}

function createDonationMethod() {
    return `<div class="max-container">
    <form method="POST" action="" id="donation-form" class="col-6 mx-auto">
    <div class="form-group form-pagamenti">
      <label for="nome">Nome</label>
      <input type="nome" name="nome" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="cognome">Cognome</label>
      <input type="cognome" name="cognome" class="form-control" required />
    </div>            
    <div class="form-group form-pagamenti">
      <label for="email">Tipo</label>
      <input type="tipo" name="tipo" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="numero">Numero</label>
      <input type="password" id="numero" name="numero" pattern=".{16}" title="Deve contenere 16 cifre." class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="CCV">CCV</label>
      <input type="password" id="CCV" name="CCV" pattern=".{3}" title="3 cifre" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="number">Importo</label>
      <input type="number" min="1" max="1000" name="importo" class="form-control" required />
    </div>
    <div class="form-check">
  </div>
    <button type="submit" id="register-button" class="btn btn-primary">Acquista</button>
  </form>
  </div>
    `;
}

function createPaymentDocument() {
  return `<form method="POST" action="" id="payment-document" class="col-6 mx-auto">
    <div class="form-group">
      <label for="nome">Nome</label>
      <input type="nome" name="nome" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="cognome">Cognome</label>
      <input type="cognome" name="cognome" class="form-control" required />
    </div>            
    <div class="form-group">
      <label for="email">Tipo</label>
      <input type="tipo" name="tipo" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="numero">Numero</label>
      <input type="password" name="numero" pattern=".{16}" title="Deve contenere 16 cifre." class="form-control" required />
    </div>
    <div class="form-group">
      <label for="CCV">CCV</label>
      <input type="password" name="CCV" pattern=".{3}" title="3 cifre" class="form-control" required />
    </div>
    <button type="submit" id="register-button" class="btn btn-primary">Acquista</button>
  </form>
    `;
}

function createFormRadioButton(bool) {
  if(bool == true){
    return `
  <input class="form-check-input mt-0 dim" type="radio" id="search-titolo" value="Tecnologia" aria-label="Radio button for following text input">Progetto`;  
  }else {
    return `
  <input class="form-check-input mt-0 dim" type="radio" id="search-titolo" value="Tecnologia" aria-label="Radio button for following text input">Progetto
  <input class="form-check-input mt-0 dim" type="radio" id="search-documento" value="Ambiente" aria-label="Radio button for following text input">Documento`;
  }
  
}

function createNavProjects() {
  return `<nav><h1>I miei Progetti</h1></nav>`;
}
 
export {createEmptyApp,createDonationMethod,createPaymentDocument,createFormRadioButton,createNavProjects}