const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askData');

function sendData(e) {
  let title = document.getElementById('title').value;
  let price = document.getElementById('price').value;
  let thumbnail = document.getElementById('thumbnail').value;
  let product = {
            title: title,
            price: price,
            thumbnail: thumbnail
  }
  socket.emit('new-message', product);
}

function render(data) {
  console.log(data);
  var html = data
    .map(function (e, index) {
      return `
      <div class="card col-3 px-1 mb-4" style="width: 18rem;">
  <img class="card-img-top" src=${e.thumbnail} alt="Card image cap">
  <div class="card-body">
    <a href="/api/productos/${e.id}" class="text-decoration-none text-dark">
      <h5 class="card-title">
        ${e.title}
      </h5>
    </a>
  </div>
  <h4> $ ${e.price} </h4>
  <h6>Agregado por el usuario: ${e.user} </h6>

</div>
      `;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) {
  render(data);
});

// document.getElementById('submitButton').addEventListener('click', sendData())
