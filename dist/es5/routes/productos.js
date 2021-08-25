"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var fs = require('fs');

var router = express_1["default"].Router();

var path = require('path');

var ubicacion = path.resolve(__dirname, '../productos.json'); //Listar todos los productos

router.get('/', function (req, response) {
  fs.readFile(ubicacion, 'utf-8', function (error, data) {
    if (error || data.length === 0) {
      response.json({
        error: 'no hay productos cargados'
      });
      return console.log('Ocurrió un error', error);
    } else {
      var productos = JSON.parse(data);
      response.render('productos.pug', {
        products: productos
      });
    }
  });
}); //Listar en forma individual (get)

router.get('/:id', function (req, response) {
  var posicion = parseInt(req.params.id);
  fs.readFile(ubicacion, 'utf-8', function (error, data) {
    var productos = JSON.parse(data);
    var match = productos.filter(function (x) {
      return x.id === posicion;
    });

    if (match.length === 0) {
      response.json({
        error: 'el id no corresponde a ningún producto'
      });
    } else {
      response.render('producto.pug', {
        product: match
      });
    }
  });
});
exports["default"] = router;