"use strict";


function createEmptyApp() {
    return `<div id="noproject"><h1>NON SONO STATI TROVATI PROGETTI</h1><div>`;
}

function createDonationMethod() {
    return `<div class="max-container">
    <h1><u><i>Dati di Pagamento</i></u></h1>
    <br><br><br>
    <form method="POST" action="" id="donation-form" class="col-6 mx-auto">
    <div class="form-group form-pagamenti">
      <label for="nome">Nome</label>
      <input type="nome" id="nome" name="nome" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="cognome">Cognome</label>
      <input type="cognome" id="cognome" name="cognome" class="form-control" required />
    </div>            
    <div class="form-group form-pagamenti">
      <label for="tipo">Metodo di Pagamento</label><br>
      <select name="MetodoDiPagamento" id="tipo">
        <option name="tipo" value="mastercard">Mastercard</option>
        <option name="tipo" value="VISA">VISA</option>
        <option name="tipo" value="Bancomat">Bancomat</option>
      </select>
    </div>
    <br>
    <div class="form-group form-pagamenti">
      <label for="numero">Numero (16 cifre)</label>
      <input type="password" id="numero" name="numero" pattern=".{16}" title="Deve contenere 16 cifre." class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="CCV">CCV (3 cifre)</label>
      <input type="password" id="CCV" name="CCV" pattern=".{3}" title="Deve contenere 3 cifre" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="number">Importo</label>
      <input type="number" min="1" max="1000" name="importo" class="form-control" required />
    </div>
    <div class="form-check">
  </div>
    <button type="submit" id="register-button" class="btn btn-primary">Dona</button>
  </form>
  </div>
    `;
}

function createPaymentDocument() {
  return `
  <div class="max-container">
  <h1><u><i>Dati di Pagamento</i></u></h1>
  <br><br><br>
  <form method="POST" action="" id="payment-document" class="col-6 mx-auto">
    <div class="form-group form-pagamenti">
      <label for="nome">Nome</label>
      <input type="nome" id="nome" name="nome" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="cognome">Cognome</label>
      <input type="cognome" id="cognome" name="cognome" class="form-control" required />
    </div>            
    <div class="form-group form-pagamenti">
    <label for="tipo">Metodo di Pagamento</label><br>
      <select name="MetodoDiPagamento" id="tipo">
        <option name="tipo" value="mastercard">Mastercard</option>
        <option name="tipo" value="VISA">VISA</option>
        <option name="tipo" value="Bancomat">Bancomat</option>
      </select>
    </div><br>
    <div class="form-group form-pagamenti">
      <label for="numero">Numero (16 cifre)</label>
      <input type="password" id="numero" name="numero" pattern=".{16}" title="Deve contenere 16 cifre." class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="CCV">CCV (3 cifre)</label>
      <input type="password" id="CCV" name="CCV" pattern=".{3}" title="Deve contenere 3 cifre" class="form-control" required />
    </div>
    <div class="form-group form-pagamenti">
      <label for="number">Importo</label>
      <input type="number" min="1" max="1000" name="importo" class="form-control" required />
    </div>
    <button type="submit" id="register-button" class="btn btn-primary">Acquista</button>
  </form>
  </div>
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