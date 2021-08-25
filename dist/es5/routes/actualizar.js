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

var ubicacion = path.resolve(__dirname, '../productos.json');
router.put('/:pos', function (req, response) {
  var posicion = parseInt(req.params.pos);
  var body = req.body;
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
      for (var e in body) {
        if (e === "price") {
          match[0].price = body[e];
        } else if (e === "title") {
          match[0].title = body[e];
        } else if (e === "thumbnail") {
          match[0].thumbnail = body[e];
        }
      }

      var nuevoProductos = JSON.stringify(productos);
      fs.writeFile(ubicacion, nuevoProductos, function (err, e) {
        if (err) {
          console.log('Error al guardar', err);
        } else {
          console.log('Se guardó correctamente');
          response.status(201).json({
            item: match
          });
        }
      });
    }
  });
});
exports["default"] = router;