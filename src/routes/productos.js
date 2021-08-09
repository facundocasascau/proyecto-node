import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');


router.get('/', (req, response) => {
  fs.readFile(ubicacion, 'utf-8', (error, data) => {
    if (error || data.length == 0) {
      response.json({
        error: 'no hay productos cargados',
      });
      return console.log('Ocurió un error', error);
    } else {
      let productos = JSON.parse(data);
      response.json(productos);
    }

  });

});

//Listar en forma individual (get)
router.get('/:id', (req, response) => {
  const posicion = parseInt(req.params.id)
  fs.readFile(ubicacion, 'utf-8', (error, data) => {
    let productos = JSON.parse(data);
    let match = productos.filter(x => x.id == posicion)
    if (match.length == 0) {
      response.json({
        error: 'el id no corresponde a ningún producto',

      });
    } else {
      response.json({
        item: match,
      });
    }
  });
});




export default router;
