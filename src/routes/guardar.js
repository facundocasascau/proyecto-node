import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');



router.get('/', (req, response) => {
  response.render('guardar')
  const body = req.body;
  console.log(body)
  console.log(response.originalUrl)
})

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
    response.render('guardar', {layout: 'datosincorrectos'})
  }else {
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
          response.status(201).json({
            data: obj,
          });
        }
      });
    });
  }
});

export default router;
