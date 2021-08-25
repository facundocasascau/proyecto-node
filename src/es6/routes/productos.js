"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = require('fs');
const router = express_1.default.Router();
const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');
//Listar todos los productos
router.get('/', (req, response) => {
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        if (error || data.length === 0) {
            response.json({
                error: 'no hay productos cargados',
            });
            return console.log('Ocurrió un error', error);
        }
        else {
            let productos = JSON.parse(data);
            response.render('productos.pug', { products: productos });
        }
    });
});
//Listar en forma individual (get)
router.get('/:id', (req, response) => {
    const posicion = parseInt(req.params.id);
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        let match = productos.filter(x => x.id === posicion);
        if (match.length === 0) {
            response.json({
                error: 'el id no corresponde a ningún producto',
            });
        }
        else {
            response.render('producto.pug', { product: match });
        }
    });
});
exports.default = router;
