import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
const fs = require('fs');
const { brotliDecompress } = require('zlib');

import Actualizar from './routes/actualizar';
import Productos from './routes/productos.js';
import Guardar from './routes/guardar.js';
import Borrar from './routes/borrar.js';

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Se está escuchando por el puerto:${port}`)
})
server.on("error", error => console.log(`Ha ocurrido un error: ${error}`))

// const publicPath = path.resolve(__dirname, '../public');
// app.use(express.static(publicPath));

const layoutFolderPaths = path.resolve(__dirname, '../views/layouts');
const defaultLayoutPath = path.resolve(__dirname, '../views/layouts/index.hbs')

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: layoutFolderPaths,
  defaultLayout: defaultLayoutPath,
  extname: 'hbs',
})
);

app.get('/', (req, response) => {
  response.render('main')
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/actualizar', Actualizar);
app.use('/api/productos', Productos);
app.use('/api/guardar', Guardar);
app.use('/api/borrar', Borrar);
