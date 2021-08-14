import express from 'express';
const path = require('path');
const fs = require('fs');
const { brotliDecompress } = require('zlib');
import Actualizar from './routes/actualizar';
import Productos from './routes/productos.js';
import Guardar from './routes/guardar.js';
import Borrar from './routes/borrar.js';
import * as http from 'http';
import io from 'socket.io';

const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Se está escuchando por el puerto:${port}`)
})
server.on("error", error => console.log(`Ha ocurrido un error: ${error}`))

// const myServer = http.Server(app)
// const myWSServer = io(myServer)
// myWSServer.on('connectio', function(socket)){
//   console.log(\n\n)
// }

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
const viewPath = path.resolve(__dirname, '../views');
app.set('vies', viewPath);




app.use('/api/actualizar', Actualizar);
app.use('/api/productos', Productos);
app.use('/api/guardar', Guardar);
app.use('/api/borrar', Borrar);
