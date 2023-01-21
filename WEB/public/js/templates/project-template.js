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

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Aggiungi</button>
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

function createProjectHTML(title, description, author, category, id) {
  return `
  <div class="box-container" id="first-container">
    <div class="registerBlock">
      <div class="block1">
        <a>${title}</a>
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

function projectPageFinanziatore(id_progetto,title, description, author, category, donations) {
  return `
    <div class="newbox-container">
      <div class="registerBlock">
        <div class="block1">
          <a>${title}</a>
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
        <svg id="star-project" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      </div>
    </div>
    <div class="newbox-container">
      <div class="details-block">
        <div class="block1">
          <h2>${title}</h2>
          <hr>
        </div>
        <div class="block1">
          <p>${description}</p>
          <hr>
        </div>
        <div class="block1">
          <p>${author}</p>
          <hr>
        </div>
        <div class="block1">
          <p>${category}</p>
          <hr>
        </div>
        <a href="/api/project/donation/${id_progetto}"<button type="button" class="btn btn-outline-info">Sostieni</button></a>
        <button type="button" class="btn btn-outline-info">TOTALE DONATO : ${donations} €</button>

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Donatori
          </button>
          <ul class="dropdown-menu" id="list-donator" aria-labelledby="dropdownMenuButton1">
    
          </ul>
        </div>

      </div>
    </div>
    
    <footer>
    <h2>DOCUMENTI</h2>
    <table class="table">
    <tbody id="documents-table">
    </tbody>
    </table>

    </footer>`;
}

function projectPage(title, description, author, category, donations) {
  return `
    <div class="newbox-container">
      <div class="registerBlock">
        <div class="block1">
          <a>${title}</a>
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
        <svg id="star-project" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      </div>
    </div>
    <div class="newbox-container">
      <div class="details-block">
        <div class="block1">
          <h2>${title}</h2>
          <hr>
        </div>
        <div class="block1">
          <p>${description}</p>
          <hr>
        </div>
        <div class="block1">
          <p>${author}</p>
          <hr>
        </div>
        <div class="block1">
          <p>${category}</p>
          <hr>
        </div>
        <button type="button" id="total-donations" class="btn btn-outline-info">TOTALE DONATO : ${donations} €</button>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Donatori
          </button>
          <ul class="dropdown-menu" id="list-donator" aria-labelledby="dropdownMenuButton1">
    
          </ul>
        </div>

      </div>
    </div>
    
    <footer>

    <h2>DOCUMENTI</h2>
    <table class="table">
        <tbody id="documents-table">
        </tbody>
    </table>

    </footer>`;
}


function createListOfDonator(user) {
  return `<li><a class="dropdown-item">${user}</a></li>`;
}

function createListOfDocuments(id_documento, titolo, descrizione, data, costo, symbolo, shop, basket, heart) {
  return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <a>${descrizione}</a>
      <a>${data}</a>
      <a>${costo}${symbolo}</a>
      <a href="/api/document/buy/${id_documento}">${shop}</a>
      <a href="/api/document/delete/${id_documento}">${basket}</a>
      <a id="full-heart" href="/api/document/follow/${id_documento}">${heart}</a>
    </td>
  </tr>`;
}

function createListOfDocumentsBought(id_documento, titolo, descrizione, data, costo, symbolo, shop, basket) {
  return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <a>${descrizione}</a>
      <a>${data}</a>
      <a>${costo}${symbolo}</a>
      <a>${shop}</a>
      <a href="/api/document/delete/${id_documento}">
      ${basket}
      </a>
    </td>
  </tr>`;
}

function documentPage(form) {
  return `
  <table class="table table-striped-columns">
  <thead>
    <tr>
        <th scope="col">Titolo</th>
        <th scope="col">Descrizione</th>
        <th scope="col">Data</th>
      </tr>
  </thead>
        <tbody class="table-group-divider" id="documents-table-page">
        </tbody>
  
        </table>
  <footer>
        <h2>COMMENTI</h2>
        <table id="comments-table">
          <tr>
            <td>
              ${form}
            </td>
          </tr>
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
    <td>
      <a>${commento}</a>
      <button class="btn btn-primary"><span>${user}</span></button>
    </td>
  </tr>`;
}

function deleteCommentButton(id_commento, commento) {
  return `
  <tr>
    <td>
      <a>${commento}</a>
      <a href="/api/document/delete/${id_commento}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></a>
      
    </td>
  </tr>`;
}

function deleteDocumentButton(id_documento) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;
}

function createFollowProjectTemplate(title, description, author, category, id) {
  return `
  <div class="box-container" id="first-container">
    <div class="registerBlock">
      <a href="/project/follow/${id}"><svg id="checked-out" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
      </svg></a>
      <div class="block1">
        <a>${title}</a>
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

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="modify-button" class="btn btn-primary">Modifica</button>
        </div>
        </form>
      </div>
    </div>
    </div>
    
    <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
    <button type="button" id="logout" class="btn btn-primary">Logout</button>`;
}

export {
  createFormProject, createNewForm, createProjectHTML, projectPage, projectPageFinanziatore, createFollowProjectTemplate,
  addModifyButton, createListOfDonator, createListOfComment, deleteCommentButton, createListOfDocuments, createImportInput, createExitForm, createCarrello,
  buyedDoc, createListOfDocumentsBought, deleteDocumentButton, HTMLfollowDocument, followedDoc, documentPage, createListOfDocumentsPage,commentForm
};