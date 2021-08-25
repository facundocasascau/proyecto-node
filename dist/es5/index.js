"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var path = require('path');

var fs = require('fs');

var actualizar_1 = __importDefault(require("./routes/actualizar"));

var productos_js_1 = __importDefault(require("./routes/productos.js"));

var guardar_js_1 = __importDefault(require("./routes/guardar.js"));

var borrar_js_1 = __importDefault(require("./routes/borrar.js"));

var http = __importStar(require("http"));

var socket_io_1 = __importDefault(require("socket.io")); //Inicialización de express


var app = express_1["default"]();
var port = 8080;
var ubicacion = path.resolve(__dirname, 'productos.json');
var publicPath = path.resolve(__dirname, '../public');
app.use(express_1["default"]["static"](publicPath)); //Pug

app.set('view engine', 'pug');
var viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);
app.get('/', function (req, res) {
  res.render('index');
}); //Inicialización WebSocket

var myServer = http.Server(app);
myServer.listen(port, function () {
  return console.log('Servidor en puerto ', port);
});
var myWSServer = socket_io_1["default"](myServer);
var productos;
fs.readFile(ubicacion, 'utf-8', function (error, data) {
  if (error || data.length === 0) {
    return console.log('Ocurrió un error', error);
  } else {
    productos = JSON.parse(data);
  }
});
myWSServer.on('connection', function (socket) {
  socket.on('new-message', function (data) {
    var idsProductos = [];
    productos.forEach(function (e) {
      return idsProductos.push(e.id);
    });
    var max = Math.max.apply(Math, idsProductos);
    var newMessage = {
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      id: max + 1,
      user: socket.client.id
    };
    productos.push(newMessage);
    myWSServer.emit('messages', productos);
    var objeto = JSON.stringify(productos); //Guardando en el Json
    // fs.writeFile(ubicacion, objeto, (err, e) => {
    //   if (err) {
    //     console.log('Error al guardar', err);
    //   } else {
    //     console.log('Se guardó correctamente');
    //   }
    // });
  });
  socket.on('askData', function (data) {
    socket.emit('messages', productos);
  });
});
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({
  extended: true
}));
app.use('/api/actualizar', actualizar_1["default"]);
app.use('/api/productos', productos_js_1["default"]);
app.use('/api/guardar', guardar_js_1["default"]);
app.use('/api/borrar', borrar_js_1["default"]);