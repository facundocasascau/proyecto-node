import express from 'express';
const path = require('path');
const fs = require('fs');
import Actualizar from './routes/actualizar';
import Productos from './routes/productos.js';
import Guardar from './routes/guardar.js';
import Borrar from './routes/borrar.js';
import * as http from 'http';
import io from 'socket.io';

//Inicialización de express
const app = express();
const port = 8080;
const ubicacion = path.resolve(__dirname, 'productos.json');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//Pug
app.set('view engine', 'pug');
const viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);


app.get('/', (req, res) => {
  res.render('index');
});

//Inicialización WebSocket
const myServer = http.Server(app)

myServer.listen(port, () => console.log('Servidor en puerto ', port))



const myWSServer = io(myServer)

let productos;

fs.readFile(ubicacion, 'utf-8', (error, data) => {
  if (error || data.length === 0) {
    return console.log('Ocurrió un error', error);
  } else {
    productos = JSON.parse(data);
  }})

  myWSServer.on('connection', function (socket) {
    socket.on('new-message', function (data) {
      let idsProductos = [];
      productos.forEach(e => idsProductos.push(e.id))
      let max = Math.max(...idsProductos);
      const newMessage = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        id: max +1,
        user: socket.client.id
      }; 
      productos.push(newMessage);
      myWSServer.emit('messages', productos);
      let objeto = JSON.stringify(productos);
      
      //Guardando en el Json
      // fs.writeFile(ubicacion, objeto, (err, e) => {
      //   if (err) {
      //     console.log('Error al guardar', err);
      //   } else {
      //     console.log('Se guardó correctamente');
      //   }
      // });
    });

    socket.on('askData', (data) => {
      socket.emit('messages', productos);
    });
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/actualizar', Actualizar);
  app.use('/api/productos', Productos);
  app.use('/api/guardar', Guardar);
  app.use('/api/borrar', Borrar);
