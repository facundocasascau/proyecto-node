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
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let productos;
//Almacenar un producto (post)
router.get('/', (req, response) => {
    response.render('index.pug', { products: productos });
});
exports.default = router;
