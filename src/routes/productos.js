import express from 'express';
import path from 'path';
const fs = require('fs');
const router = express.Router();
const app = express();
const ubicacion = path.resolve(__dirname, '../productos.json');


//Listar todos los productos
router.get('/', (req, response) => {
  fs.readFile(ubicacion, 'utf-8', (error, data) => {
    if (error || data.length === 0) {
      response.render({layout: 'sinproductos'})
      return console.log('Ocurió un error', error);
    } else {
      let productos = JSON.parse(data);
      response.render('listado', productos)
    }
  });
});

//Listar en forma individual (get)
router.get('/:id', (req, response) => {
  const posicion = parseInt(req.params.id)
  fs.readFile(ubicacion, 'utf-8', (error, data) => {
    let productos = JSON.parse(data);
    let match = productos.filter(x => x.id === posicion)
    if (match.length === 0) {
      response.render('productos', {layout: 'sinproductos'});
    } else {
      response.render('productos', match[0])
    }
  });
});




export default router;
