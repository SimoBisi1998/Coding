"use strict";


function createEmptyApp() {
    return `<h1>NON SONO PRESENTI PROGETTI SEGUITI</h1>`;
}

function createDonationMethod() {
    return `<form method="POST" action="" id="donation-form" class="col-6 mx-auto">
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
      <input type="password" id="numero" name="numero" pattern=".{16}" title="Deve contenere 16 cifre." class="form-control" required />
    </div>
    <div class="form-group">
      <label for="CCV">CCV</label>
      <input type="password" id="CCV" name="CCV" pattern=".{3}" title="3 cifre" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="number">Importo</label>
      <input type="number" min="1" max="1000" name="importo" class="form-control" required />
    </div>
    <div class="form-check">
  </div>
    <button type="submit" id="register-button" class="btn btn-primary">Acquista</button>
  </form>
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
export {createEmptyApp,createDonationMethod,createPaymentDocument}