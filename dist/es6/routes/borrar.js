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
router.post('/:id', (req, response) => {
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        const posicion = parseInt(req.params.id);
        let productos = JSON.parse(data);
        let match = productos.filter(x => x.id === posicion);
        if (match.length === 0) {
            response.json({
                error: 'el id no corresponde a ningún producto',
            });
        }
        else {
            for (const e in productos) {
                if (productos[e].id === match[0].id) {
                    productos.splice(e, 1);
                }
            }
            let nuevoProductos = JSON.stringify(productos);
            fs.writeFile(ubicacion, nuevoProductos, (err, e) => {
                if (err) {
                    console.log('Error al guardar', err);
                }
                else {
                    response.status(201).json({
                        borrado: match,
                    });
                }
            });
            response.json({
                borrado: match,
            });
        }
    });
});
exports.default = router;