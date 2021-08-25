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

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
var productos; //Almacenar un producto (post)

router.get('/', function (req, response) {
  response.render('index.pug', {
    products: productos
  });
});
exports["default"] = router;