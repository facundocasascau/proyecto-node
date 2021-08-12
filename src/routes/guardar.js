import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');



//Almacenar un producto (post)

router.post('/', (req, response) => {

  const body = req.body;
  if (
    !body.title ||
    !body.price ||
    !body.thumbnail ||
    typeof body.title != 'string' ||
    //typeof body.price != 'number' ||
    typeof body.thumbnail != 'string'
  ) {
    return response.status(400).json({
      msg: 'Ingrese title, price y url de foto por favor',
    });
  }

  fs.readFile(ubicacion, 'utf-8', (error, data) => {
    let productos = JSON.parse(data);
    let idsProductos = [];
    productos.forEach(e => idsProductos.push(e.id))
    console.log(productos)
    let max = Math.max(...idsProductos);
    let obj = {
      title: body.title,
      price: body.price,
      thumbnail: body.thumbnail,
      id: max + 1
    };
    productos.push(obj);
    let objeto = JSON.stringify(productos);
    fs.writeFile(ubicacion, objeto, (err, e) => {
      if (err) {
        console.log('Error al guardar', err);
      } else {
        console.log('Se guardó correctamente');
        response.render('guardar.pug',{products: productos})
      }
    });
  });

});

export default router;
