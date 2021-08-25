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
router.put('/:pos', (req, response) => {
    const posicion = parseInt(req.params.pos);
    const body = req.body;
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        let match = productos.filter(x => x.id === posicion);
        if (match.length === 0) {
            response.json({
                error: 'el id no corresponde a ningún producto',
            });
        }
        else {
            for (const e in body) {
                if (e === "price") {
                    match[0].price = body[e];
                }
                else if (e === "title") {
                    match[0].title = body[e];
                }
                else if (e === "thumbnail") {
                    match[0].thumbnail = body[e];
                }
            }
            let nuevoProductos = JSON.stringify(productos);
            fs.writeFile(ubicacion, nuevoProductos, (err, e) => {
                if (err) {
                    console.log('Error al guardar', err);
                }
                else {
                    console.log('Se guardó correctamente');
                    response.status(201).json({
                        item: match,
                    });
                }
            });
        }
    });
});
exports.default = router;
