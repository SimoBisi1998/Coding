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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Aggiungi</h1>
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

function createProjectHTML(title, description, author, category, id,img,number) {
  
  return `
  <div class="box-container" id="first-container">
    <div id="registerBlock">
      <a><h3>${number}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
    </svg></h3></a>
      <div class="block1">
        <img src="../../images/categorie/${img}.jpeg">
      </div>        
      <br>
      <div class="block1">
        <h3><i>Titolo</i></h3>
        <p>${title}</p>
      </div>
      <div class="block1">
      <h3><i>Autore</i></h3>
        <p>${author}</p>
      </div>
      <div class="block1">
      <h3><i>Categoria</i></h3>
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
    <br>
    <div class="block1">
        <img src="../../images/pdf.png">
      </div>        
      <br>
      <div class="block1">
      <h3><i>Titolo</i></h3>
        <p>${title}</p>
      </div>
      <div class="block1">
      <h3><i>Descrizione</i></h3>
        <p>${description}</p>
      </div>
      <div class="block1">
      <h3><i>Data</i></h3>
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

function createDocHTMLTemplate(id_documento,title, description, date) {
  return `
  <div class="box-container" id="first-container">
    <div id="registerBlock">
    <a href="/document/follow/${id_documento}"><svg id="checked-out" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
      </svg></a>
    <div class="block1">
        <img src="../../images/pdf.png">
      </div>        
      <br>
      <div class="block1">
      <h3><i>Titolo</i></h3>
        <p>${title}</p>
      </div>
      <div class="block1">
      <h3><i>Descrizione</i></h3>
        <p>${description}</p>
      </div>
      <div class="block1">
      <h3><i>Data</i></h3>
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

function projectPageFinanziatore(id_progetto,title, description, author, category, donations,image,favourites,like) {
  return `
    <div class="new-box-container" id="first-container">
      <div id="registerBlock">
        ${favourites}
      <div class="block1">
        <img src="../../images/categorie/${image}.jpeg">
      </div><br>
        <div class="block1">
          <h2><i>Titolo</i></h2>
          <p>${title}</p>
        </div>
      </div>
    </div>

    <div class="new-box-container">
      <div id="registerBlock">
      <br>
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
        <br>
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
          <br><br>
          <div id="likeProject">
          ${like}
          </div>
        </div>
     </div>
  </div>
    <footer>
    <h2>LISTA DI DOCUMENTI</h2>
    <table class="table">
        <tbody id="documents-table">
          <thead class="table-dark">
            <tr>
            <th scope="col">Titolo</th>
            <th scope="col">Descrizione</th>
            <th scope="col">Data</th>
            <th scope="col">Costo</th>
            <th scope="col">Preferiti</th>
            <th scope="col">Acquistato</th>
            <th scope="col">Download</th>
            </tr>
          </thead>
        </tbody>
    </table>
    </footer>`;
}

function projectPageUndefined(id_progetto,title, description, author, category, donations,image) {
  return `
  <div class="alignment-box">
    <div class="new-box-container" id="first-container">
      <div id="registerBlock">
        <br>
      <div class="block1">
        <img src="../../images/categorie/${image}.jpeg">
      </div>
      <br>
        <div class="block1">
        <h2><i>Titolo</i></h2>
        <p>${title}</p>
        </div>
      </div>
    </div>

    <div class="new-box-container">
      <div id="registerBlock">
      <br>
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
        <br>
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
    </div>
    
    <footer>
    <h2>LISTA DI DOCUMENTI</h2>
    <table class="table">
        <tbody id="documents-table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Titolo</th>
              <th scope="col">Descrizione</th>
              <th scope="col">Data</th>
              <th scope="col">Costo</th>
              <th scope="col">Download</th>
            </tr>
          </thead>
        </tbody>
    </table>
    </footer>`;
}

function imageFollowProject(id_progetto) {
  return `<a href="/api/project/follow/${id_progetto}"><svg id = "star-project" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></a>`;
}

function projectPage(id_progetto,title, description, author, category, donations,image,favourites,like) {
  return `
  <div class="alignment-box">
  <div class="new-box-container" id="first-container">
  <div id="registerBlock">
  ${favourites}
  <div class="block1">
    <img src="../../images/categorie/${image}.jpeg">
  </div>
  <br>
    <div class="block1">
    <h2><i>Titolo</i></h2>
    <p>${title}</p>
    </div>
  </div>
</div>

<div class="new-box-container">
  <div id="registerBlock">
    <div class="block1">
    <br>
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
    <br>
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
      <br><br>
          <div id="likeProject">
          ${like}
          </div>
    </div>
 </div>
</div>
</div>

<footer>
<h2>LISTA DI DOCUMENTI</h2>
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
          <th scope="col">Preferiti</th>
          <th scope="col">Acquistato</th>
          <th scope="col">Download</th>
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

function likeProject(id_progetto) {
  return `
  <p><b>Mi Piace</b><a href="/project/like/${id_progetto}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
  </svg></a></p>`;
}
function createListOfDocumentsBought(id_documento, titolo, descrizione, data, costo, symbolo, shop, basket, modify,heart,ruolo,file,newValue) {
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
    if(modify == 0) {
      modify = "/";
      basket = "/";
      return `
      <tr>
        <td>
          <a href="/api/document/${id_documento}">${titolo}</a>
          <td><a>${descrizione}</a></td>
          <td><a>${data}</a></td>
          <td><a>${costo}${symbolo}</a></td>
          <td>${modify}</td>
          <td>${basket}</td>
          <td>${heart}</td>
          <td>${shop}</td>
          <td>${newValue}</td>
        </td>
      </tr>`;      
    }else {
      return `
      <tr>
        <td>
          <a href="/api/document/${id_documento}">${titolo}</a>
          <td><a>${descrizione}</a></td>
          <td><a>${data}</a></td>
          <td><a>${costo}${symbolo}</a></td>
          <td>${modify}</td>
          <td>${basket}</td>
          <td>${heart}</td>
          <td>${shop}</td>
          <td>${newValue}</td>
        </td>
      </tr>`;
    }
  }if(ruolo == false) {
    return `
  <tr>
    <td>
      <a href="/api/document/${id_documento}">${titolo}</a>
      <td><a>${descrizione}</a></td>
      <td><a>${data}</a></td>
      <td><a>${costo}${symbolo}</a></td>
      <td>${heart}</td>
      <td>${shop}</td>
      <td>${newValue}</td>
    </td>
  </tr>`;
  }
}

function createLinkToDownload(file){
  return `<a href="../../images/documenti/${file}.pdf" download><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg></a>`;
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


function createCarrello(id_documento) {
  return `
  <a href="/api/document/buy/${id_documento}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg></a>`;
}

function followedDoc(id_documento) {
  return `
  <a id="full-heart" href="/api/document/follow/${id_documento}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg></a>`;
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
  <a href="/api/document/delete/${id_documento}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg></a>`;
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
        <img src="../../images/categorie/${img}.jpeg">
      </div>        
      <div class="block1">
      <h3><i>Titolo</i></h3>
        <p>${title}</p>
      </div>
      <div class="block1">
      <h3><i>Autore</i></h3>
        <p>${author}</p>
      </div>
      <div class="block1">
      <h3><i>Categoria</i></h3>
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

function HTMLfollowDocument(id_documento) {
  return `
  <a id="full-heart" href="/api/document/follow/${id_documento}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg></a>`;
}

function addNewModButton() {
  return `
    <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
    <button type="button" id="logout" class="btn btn-primary">Logout</button>`;
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
              <input type="date" class="form-control input-lg" name="Data" placeholder="Inserisci una data.." id="form-date" required>
            </div>
          </div>

          <div class="form-group">
          <label class="control-label">Costo (0 o vuoto se "Gratis") </label>
            <div>
              <input type="number" id="form-cost" min="0" max="1000" name="importo" placeholder="Inserisci un costo.." class="form-control" required>
            </div>
          </div>

          <div class="form-group">
              <label class="control-label">Documento</label>
              <div>
                <input type="file" id="form-pdf" class="form-control input-lg" placeholder="Carica un documento.." name="text_file" required>
              </div>
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
            <label class="control-label">Immagine</label>
            <div>
              <input type="file" class="form-control input-lg" name="Immagine" placeholder="Inserisci una immagine" id="mod-image" required>
            </div>
          </div>

          <div id="modify-template-form">
          </div>

        </div>
        </form>
      </div>
    </div>
    </div>
    
    <button type="button" id="my-account" class="btn btn-outline-info">Il mio account</button>
    <button type="button" id="logout" class="btn btn-primary">Logout</button>`;
}

function formDoc (id_documento) {
  return `

  <a href="/api/document/modify/${id_documento}"><svg xmlns="http://www.w3.org/2000/svg" id="crea-documento" data-bs-toggle="modal" data-bs-target="#createDocument" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg></a>
  <div class="modal fade" id="createDocument" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modifica Documento</h1>
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
              <input type="date" class="form-control input-lg" name="Data" placeholder="Inserisci una data.." id="form-date" required>
            </div>
          </div>
          <br>

          <div class="form-group">
            <label class="control-label">Costo (0 o vuoto se "Gratis") </label>
            <div>
              <input type="number" id="form-cost" min="0" max="1000" name="importo" class="form-control" required />
            </div>
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
function notLikeProject(id_progetto) {
  return `<p><b>Mi Piace</b><a href="/project/like/${id_progetto}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg></a></p>`;
}
export {
  createFormProject, createNewForm, createProjectHTML, projectPage, projectPageFinanziatore, createFollowProjectTemplate,
  addModifyButton, createListOfDonator, createListOfComment, deleteCommentButton, createImportInput, createExitForm, createCarrello,
  buyedDoc, createListOfDocumentsBought, deleteDocumentButton, HTMLfollowDocument, followedDoc, documentPage, createListOfDocumentsPage,commentForm,commentFormNew,
  modifyDocument,formDoc,createModForm,createDocHTML,projectPageUndefined,imageFollowProject,starProject,likeProject,notLikeProject,addNewModButton,createDocHTMLTemplate,createLinkToDownload
};