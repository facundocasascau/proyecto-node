import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');
// const app = express();
// router.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Almacenar un producto (post)
router.get('/', (req, response) => {
  response.render('guardar.pug')
  const body = req.body;
  console.log(body)
  console.log(response.originalUrl)
})

router.post('/', (req, response) => {
  const body = req.body;
  console.log(body)
  console.log(response)
  // if (
  //   !body.title ||
  //   !body.price ||
  //   !body.thumbnail ||
  //   typeof body.title != 'string' ||
  //   //typeof body.price != 'number' ||
  //   typeof body.thumbnail != 'string'
  // ) {
  //   console.log(body)
  //   response.render('guardar.pug')
  // } else {
  //
  //   fs.readFile(ubicacion, 'utf-8', (error, data) => {
  //     let productos = JSON.parse(data);
  //     let idsProductos = [];
  //     productos.forEach(e => idsProductos.push(e.id))
  //     console.log(productos)
  //     let max = Math.max(...idsProductos);
  //     let obj = {
  //       title: body.title,
  //       price: body.price,
  //       thumbnail: body.thumbnail,
  //       id: max + 1
  //     };
  //     productos.push(obj);
  //     let objeto = JSON.stringify(productos);
  //     fs.writeFile(ubicacion, objeto, (err, e) => {
  //       if (err) {
  //         console.log('Error al guardar', err);
  //       } else {
  //         console.log('Se guardó correctamente');
  //         response.render('guardar.pug',{products: productos})
  //       }
  //     });
  //   });
  // }
});

export default router;
