import express from 'express';
const path = require('path');
const fs = require('fs');
const { brotliDecompress } = require('zlib');
import Actualizar from './routes/actualizar';
import Productos from './routes/productos.js';


const app = express();
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Se está escuchando por el puerto:${port}`)
})
server.on("error", error => console.log(`Ha ocurrido un error: ${error}`))

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/productos/actualizar', Actualizar);
app.use('/productos', Productos);