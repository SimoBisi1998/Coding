"use strict";

function createSignForm() {
    return`<form method="POST" action="" id="sign-form" class="col-6 mx-auto">            
    <div class="form-group">
      <label for="email">Indirizzo mail</label>
      <input type="email" name="email" class="form-control" placeholder="Email,username.." required />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control" placeholder="Password.." required autocomplete/>
    </div>
    <button type="submit" class="btn btn-primary">Sign UP</button>
    </form>`;
}

export {createSignForm};