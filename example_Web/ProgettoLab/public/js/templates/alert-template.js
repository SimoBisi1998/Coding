function createAlert(type, message) {
  return `<div class="alert alert-${type} alert-dismissible fade show" role="success">
  <span>${message}</span> 
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
  </button>
  </div>`;
}

export {createAlert};