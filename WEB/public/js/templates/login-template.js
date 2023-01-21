"use strict";

function createRegisterForm() {
  return`<form method="POST" action="" id="signup-form" class="col-6 mx-auto">
  <div class="form-group">
    <label for="nome">Nome</label>
    <input type="nome" name="nome" class="form-control" required />
  </div>
  <div class="form-group">
    <label for="cognome">Cognome</label>
    <input type="cognome" name="cognome" class="form-control" required />
  </div>            
  <div class="form-group">
    <label for="email">Indirizzo mail</label>
    <input type="email" name="email" class="form-control" required />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" class="form-control" required autocomplete/>
  </div>
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck">
  <label class="form-check-label" for="defaultCheck1">
    Finanziatore
  </label>
</div>
  <button type="submit" id="register-button" class="btn btn-primary">Login</button>
</form>`;
}

function createLoginForm() {
  return`<form method="POST" action="" id="login-form" class="col-6 mx-auto login-form">             
    <div class="form-group">
      <label for="email">Indirizzo mail</label>
      <input type="email" name="email" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control" required autocomplete/>
    </div>
    <button type="submit" id="signup" class="btn btn-primary">Login</button> 
  </form>`;
}

function createLogoutForm(message) {
  if(message === 'create-project') {
    return `
      <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
      <button type="button" id="logout" class="btn btn-primary">Logout</button>`; 
  }
  else {
    return `
      <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
      <button type="button" id="logout" class="btn btn-primary">Logout</button>`; 
  }
}

function createSideNav() {
  return `<a class="nav-link" id="home">Home</a>`;
}

export {createRegisterForm,createLoginForm,createLogoutForm,createSideNav};