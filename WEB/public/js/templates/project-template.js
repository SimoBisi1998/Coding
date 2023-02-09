"use strict";

function createFormProject() {
  return `
    <button type="button" class="btn btn-primary" id="project" data-bs-toggle="modal" data-bs-target="#createProject">
    Crea Progetto
    </button>
    <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Aggiungi nuovo</h1>
          <button type="button" class="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form role="form" method="POST" action="" id="add-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label">Titolo</label>
              <div>
                <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo..." id="form-title" required>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label">Descrizione</label>
              <div>
                  <input type="text" class="form-control input-lg" name="Descrizione" placeholder="Inserisci una descrizione..." id="form-description" required>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label">Autore</label>
              <div>
                <input type="text" class="form-control input-lg" name="Autore" placeholder="Inserisci un autore.." id="form-author" required>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label">Categoria</label>
              <div>
                <input type="text" class="form-control input-lg" name="Categoria" placeholder="Inserisci una categoria" id="form-category" required>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label">Immagine</label>
              <div>
                <input type="file" class="form-control input-lg" name="text_file" id="form-image" required>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" id="add-form-button" class="btn btn-primary">Aggiungi</button>
          </div>
          </form>
        </div>
      </div>
      </div>

      <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
      <button type="button" id="logout" class="btn btn-primary">Logout</button>
`;
}

function createNewForm() {
  return `
  <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
  <button type="button" id="logout" class="btn btn-primary">Logout</button>`;
}

function createProjectHTML(title, description, author, category, id,img) {
  
  return `
  <div class="box-container" id="first-container">
    <div id="registerBlock">
      <div class="block1">
        <img src="../../images/${img}.jpeg">
      </div>        
      <div class="block1">
        <h2>${title}</h2>
      </div>
      <hr></hr>
      <div class="block1">
        <p>${description}</p>
      </div>
      <div class="block1">
        <p>${author}</p>
      </div>
      <div class="block1">
        <p>${category}</p>
      </div>
      <a href="/project/${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle-fill arrow-project" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg></a>
    </div>
  </div>`;
}

function createDocHTML(id_documento,title, description, date) {
  return `
  <div class="box-container" id="first-container">
    <div id="registerBlock">
    <div class="block1">
        <img src="../../images/pdf.png">
      </div>        
      <div class="block1">
        <a>${title}</a>
      </div>
      <div class="block1">
        <p>${description}</p>
      </div>
      <div class="block1">
        <p>${date}</p>
      </div>
      <a href="/api/document/${id_documento}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle-fill arrow-project" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg></a>
    </div>
  </div>
  `;
}

function projectPageFinanziatore(id_progetto,title, description, author, category, donations,image,favourites) {
  return `
    <div class="new-box-container" id="first-container">
      <div id="registerBlock">
        ${favourites}
      <div class="block1">
        <img src="../../images/${image}.jpeg">
      </div>
        <div class="block1">
          <h2>${title}</h2>
          <hr>
        </div>
        <div class="block1">
          <p>${category}</p>
          <hr>
        </div>
      </div>
    </div>

    <div class="new-box-container">
      <div id="registerBlock">
        <div class="block1">
          <h2><i>Descrizione</i></h2>
          <p>${description}</p>
          <hr>
          <h2><i>Categoria</i></h2>
          <p>${category}</p>
          <hr>
          <h2><i>Autore</i></h2>
          <p>${author}</p>
        </div>
      </div>
    </div>

    <div class="new-box-container">
      <div id="registerBlock">
        <div id="donationBlock">
          <a href="/api/project/donation/${id_progetto}"<button type="button" class="sostieni-button">Sostieni</button></a><br><br>
          <a id="totaldonations-button"><b>Totale Donato:</b></a><br>
          <p id="value"><b><i>${donations}€</b></i></p>
          <br>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Donatori
            </button>
            <ul class="dropdown-menu" id="list-donator" aria-labelledby="dropdownMenuButton1">
        
            </ul>
          </div>
        </div>
     </div>
    </div>
    
    <footer>
    <h2>DOCUMENTI</h2>
    <table class="table">
        <tbody id="documents-table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Titolo</th>
              <th scope="col">Descrizione</th>
              <th scope="col">Data</th>
              <th scope="col">Costo</th>
              <th scope="col">Acquistato</th>
              <th scope="col">Preferiti</th>
            </tr>
          </thead>
        </tbody>
    </table>
    </table>

    </footer>`;
}

function imageFollowProject(id_progetto) {
  return `<a href="/api/project/follow/${id_progetto}"><svg id = "star-project" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></a>`;
}

function projectPageUndefined(id_progetto,title, description, author, category, donations,image) {
  return `
  <div class="new-box-container" id="first-container">
  <div id="registerBlock">
  <div class="block1">
    <img src="../../images/${image}.jpeg">
  </div>
    <div class="block1">
      <h2>${title}</h2>
      <hr>
    </div>
    <div class="block1">
      <p>${category}</p>
      <hr>
    </div>
  </div>
</div>

<div class="new-box-container">
  <div id="registerBlock">
    <div class="block1">
      <h2><i>Descrizione</i></h2>
      <p>${description}</p>
      <hr>
      <h2><i>Categoria</i></h2>
      <p>${category}</p>
      <hr>
      <h2><i>Autore</i></h2>
      <p>${author}</p>
    </div>
  </div>
</div>

<div class="new-box-container">
  <div id="registerBlock">
    <div id="donationBlock">
      <a id="totaldonations-button"><b>Totale Donato:</b></a><br>
      <p id="value"><b><i>${donations}€</b></i></p>
      <br>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Donatori
        </button>
        <ul class="dropdown-menu" id="list-donator" aria-labelledby="dropdownMenuButton1">
    
        </ul>
      </div>
    </div>
 </div>
</div>

<footer>
<h2>DOCUMENTI</h2>
<table class="table">
    <tbody id="documents-table">
      <thead class="table-dark">
        <tr>
          <th scope="col">Titolo</th>
          <th scope="col">Descrizione</th>
          <th scope="col">Data</th>
          <th scope="col">Costo</th>
        </tr>
      </thead>
    </tbody>
</table>
</table>

</footer>`;
}

function projectPage(id_progetto,title, description, author, category, donations,image,favourites) {
  return `
  <div class="new-box-container" id="first-container">
  <div id="registerBlock">
  <div class="block1">
    <img src="../../images/${image}.jpeg">
  </div>
    <div class="block1">
      <h2>${title}</h2>
      <hr>
    </div>
    <div class="block1">
      <p>${category}</p>
      <hr>
    </div>
  </div>
</div>

<div class="new-box-container">
  <div id="registerBlock">
    <div class="block1">
      <h2><i>Descrizione</i></h2>
      <p>${description}</p>
      <hr>
      <h2><i>Categoria</i></h2>
      <p>${category}</p>
      <hr>
      <h2><i>Autore</i></h2>
      <p>${author}</p>
    </div>
  </div>
</div>

<div class="new-box-container">
  <div id="registerBlock">
    <div id="donationBlock">
      <a id="totaldonations-button"><b>Totale Donato:</b></a><br>
      <p id="value"><b><i>${donations}€</b></i></p>
      <br>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Donatori
        </button>
        <ul class="dropdown-menu" id="list-donator" aria-labelledby="dropdownMenuButton1">
    
        </ul>
      </div>
    </div>
 </div>
</div>

<footer>
<h2>DOCUMENTI</h2>
<table class="table">
    <tbody id="documents-table">
      <thead class="table-dark">
        <tr>
          <th scope="col">Titolo</th>
          <th scope="col">Descrizione</th>
          <th scope="col">Data</th>
          <th scope="col">Costo</th>
          <th scope="col">Modifica</th>
          <th scope="col">Elimina</th>
        </tr>
      </thead>
    </tbody>
</table>
</table>

</footer>`;
}


function createListOfDonator(user) {
  return `<li><a class="dropdown-item">${user}</a></li>`;
}

function createListOfDocuments(id_documento, titolo, descrizione, data, costo, symbolo, shop, basket, heart, modify,ruolo) {
  if(ruolo == 'undefined') {
    return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <td><a>${descrizione}</a></td>
      <td><a>${data}</a></td>
      <td><a>${costo}${symbolo}</a></td>
    </td>
  </tr>`;
  }if(ruolo == true) {
    return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <td><a>${descrizione}</a></td>
      <td><a>${data}</a></td>
      <td><a>${costo}${symbolo}</a></td>
      <td><a href="/api/document/modify/${id_documento}">${modify}</a></td>
      <td><a href="/api/document/delete/${id_documento}">${basket}</a></td>
    </td>
  </tr>`;
  }if(ruolo == false) {
    return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <td><a>${descrizione}</a></td>
      <td><a>${data}</a></td>
      <td><a>${costo}${symbolo}</a></td>
      <td><a href="/api/document/buy/${id_documento}">${shop}</a></td>
      <td><a id="full-heart" href="/api/document/follow/${id_documento}">${heart}</a></td>
    </td>
  </tr>`;
  }
    
}

function createListOfDocumentsBought(id_documento, titolo, descrizione, data, costo, symbolo, shop, basket, modify) {
  return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <td><a>${descrizione}</a></td>
      <td><a>${data}</a></td>
      <td><a>${costo}${symbolo}</a></td>
      <td><a>${shop}</a></td>
      <td><a href="/api/document/modify/${id_documento}">${modify}</a></td>
      <td><a href="/api/document/delete/${id_documento}">${basket}</a></td>
    </td>
  </tr>`;
}

function documentPage(form) {
  return `
  <nav id="nav-doc">
    <table class="table">   
          <thead class="table-dark">
            <tr>
              <th scope="col">Titolo</th>
              <th scope="col">Descrizione</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody id="documents-table-page">
          </tbody>
    </table>
  </nav>
  <footer>
        <h2>COMMENTI</h2>
        ${form}
        <span id="new-form-comment">

        </span>
        <table id="comments-table" class="table">   
        <thead class="table-dark" >
          <tr>
            <th scope="col">Utente</th>
            <th scope="col">Testo</th>
          </tr>
          </thead>
            <tbody>
          </tbody>
    </table>
  </footer>
  `;
}

function commentForm() {
  return `
  <form method="POST" action="" id="comment-form" class="col-6 mx-auto">
    <input type="text" name="comment" id="comment" placeholder="Inserisci un commento...">
    <button type="submit" id="comment-button" class="btn btn-primary">Commenta</button>
  </form>
  `;
}

function commentFormNew() {
  return `
  <div>
  <br><br>
    <h2>Nuovo Commento</h2>
    <form method="POST" action="" id="comment-form-new" class="col-6 mx-auto">
      <input type="text" name="comment" id="comment" placeholder="NUOVO COMMENTO">
      <button type="submit" id="comment-button-new" class="btn btn-primary">Commenta</button>
    </form>
  </div>
  `;
}
function createListOfDocumentsPage(titolo, descrizione, data) {
  return `
  <tr>
    <td><a scope="row">${titolo}</a></td>
    <td><a scope="row">${descrizione}</a></td>
    <td><a scope="row">${data}</a></td>
  </tr>`;
}


function createCarrello() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>`;
}

function followedDoc() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg>`;
}

function buyedDoc() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>`;
}
function createListOfComment(commento, user) {
  return `
  <tr>
      <td><button class="btn btn-primary"><span>${user}</span></button></td>
      <td><a>${commento}</a></td>
  </tr>`;
}

function deleteCommentButton(id_commento, commento,user) {
  return `
  <tr>
    <td>${user}</td>
      <td><a>${commento}</a>
      <a href="/api/comment/delete/${id_commento}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></a>
      <span id="new-form-comment"><a href="/api/comment/modify/${id_commento}" id="modify-comment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg></a></span></td>
  </tr>`;
}

function deleteDocumentButton(id_documento) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;
}

function modifyDocument(id_documento) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg>`;
}

function createFollowProjectTemplate(title, description, author, category, id,img) {
  return `
  <div class="box-container" id="first-container">
    <div id="registerBlock">
      <a href="/project/follow/${id}"><svg id="checked-out" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
      </svg></a>
      <div class="block1">
        <img src="../../images/${img}.jpeg">
      </div>        
      <div class="block1">
        <p>${title}</p>
      </div>
      <div class="block1">
        <p>${description}</p>
      </div>
      <div class="block1">
        <p>${author}</p>
      </div>
      <div class="block1">
        <p>${category}</p>
      </div>
      <a href="/project/${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle-fill arrow-project" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg></a>
    </div>
  </div>`;
}

function createImportInput() {
  return `
  <input type="text" id="form-cost" min="1" max="1000" name="importo" class="form-control" required />
  <span><label for="text">€</label></span>`;
}

function createExitForm() {
  return `
    <button type="submit" id="submit-doc" class="btn btn-primary">Aggiungi</button>
  `;

}

function HTMLfollowDocument() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg>`;
}

function addModifyButton() {
  return `

  <button type="button" id="crea-documento" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createDocument">
  Aggiungi Documento
  </button>
  <div class="modal fade" id="createDocument" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Aggiungi Documento</h1>
        <button type="button" class="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="POST" action="" id="document-form">
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label">Titolo</label>
            <div>
              <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo..." id="form-title" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Descrizione</label>
            <div>
                <input type="text" class="form-control input-lg" name="Descrizione" placeholder="Inserisci una descrizione..." id="form-description" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Data</label>
            <div>
              <input type="date" class="form-control input-lg" name="Autore" placeholder="Inserisci una data.." id="form-date" required>
            </div>
          </div>

          <div class="form-group">
          <input type="text" id="form-cost" min="1" max="1000" name="importo" class="form-control" required />
          </div>

          <div id="command-form">
          </div>
        </div>
        </form>
      </div>
    </div>
    </div>





  <button type="button" id="elimina-progetto" class="btn btn-outline-info">Elimina</button>
  <button type="button" class="btn btn-primary" id="modifica-progetto" data-bs-toggle="modal" data-bs-target="#modifyProject">
  Modifica
  </button>
  <div class="modal fade" id="modifyProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modifica Progetto</h1>
        <button type="button" class="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="POST" action="" id="modify-form">
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label">Titolo</label>
            <div>
              <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo..." id="mod-title" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Descrizione</label>
            <div>
                <input type="text" class="form-control input-lg" name="Descrizione" placeholder="Inserisci una descrizione..." id="mod-description" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Autore</label>
            <div>
              <input type="text" class="form-control input-lg" name="Autore" placeholder="Inserisci un autore.." id="mod-author" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Categoria</label>
            <div>
              <input type="text" class="form-control input-lg" name="Categoria" placeholder="Inserisci una categoria" id="mod-category" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">Categoria</label>
            <div>
              <input type="file" class="form-control input-lg" name="Immagine" placeholder="Inserisci una immagine" id="mod-image" required>
            </div>
          </div>

        </div>
        
        <div class="modal-footer">
          <button type="submit" id="modify-button" class="btn btn-primary">Modifica</button>
        </div>
        </form>
      </div>
    </div>
    </div>
    
    <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
    <button type="button" id="logout" class="btn btn-primary">Logout</button>`;
}

function formDoc () {
  return `

  <svg xmlns="http://www.w3.org/2000/svg" id="crea-documento" data-bs-toggle="modal" data-bs-target="#createDocument" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg>
  <div class="modal fade" id="createDocument" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Aggiungi Documento</h1>
        <button type="button" class="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="POST" action="" id="document-form">
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label">Titolo</label>
            <div>
              <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo..." id="form-title" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Descrizione</label>
            <div>
                <input type="text" class="form-control input-lg" name="Descrizione" placeholder="Inserisci una descrizione..." id="form-description" required>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Data</label>
            <div>
              <input type="date" class="form-control input-lg" name="Autore" placeholder="Inserisci una data.." id="form-date" required>
            </div>
          </div>

          <div class="form-group">
          <input type="text" id="form-cost" min="1" max="1000" name="importo" class="form-control" required />
          </div>

          <div id="command-form">
          </div>
        </div>
        </form>
      </div>
    </div>
    </div>


  `;
}

function createModForm() {
  return `
    <button type="submit" id="mod-doc" class="btn btn-primary">Modifica</button>
  `;
}

function starProject(id_progetto) {
  return `<a href="/api/project/follow/${id_progetto}"><svg id="star-project" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg></a>`;
}
export {
  createFormProject, createNewForm, createProjectHTML, projectPage, projectPageFinanziatore, createFollowProjectTemplate,
  addModifyButton, createListOfDonator, createListOfComment, deleteCommentButton, createListOfDocuments, createImportInput, createExitForm, createCarrello,
  buyedDoc, createListOfDocumentsBought, deleteDocumentButton, HTMLfollowDocument, followedDoc, documentPage, createListOfDocumentsPage,commentForm,commentFormNew,
  modifyDocument,formDoc,createModForm,createDocHTML,projectPageUndefined,imageFollowProject,starProject
};