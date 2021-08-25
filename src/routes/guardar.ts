import express from 'express';
const fs = require('fs');
const router = express.Router();
const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');

import * as http from 'http';
import io from 'socket.io';


const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let productos;
//Almacenar un producto (post)
router.get('/', (req, response) => {

  response.render('index.pug', {products: productos});
})





export default router;
