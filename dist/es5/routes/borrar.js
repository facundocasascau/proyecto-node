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
router.post('/:id', function (req, response) {
  fs.readFile(ubicacion, 'utf-8', function (error, data) {
    var posicion = parseInt(req.params.id);
    var productos = JSON.parse(data);
    var match = productos.filter(function (x) {
      return x.id === posicion;
    });

    if (match.length === 0) {
      response.json({
        error: 'el id no corresponde a ningún producto'
      });
    } else {
      for (var e in productos) {
        if (productos[e].id === match[0].id) {
          productos.splice(e, 1);
        }
      }

      var nuevoProductos = JSON.stringify(productos);
      fs.writeFile(ubicacion, nuevoProductos, function (err, e) {
        if (err) {
          console.log('Error al guardar', err);
        } else {
          response.status(201).json({
            borrado: match
          });
        }
      });
      response.json({
        borrado: match
      });
    }
  });
});
exports["default"] = router;