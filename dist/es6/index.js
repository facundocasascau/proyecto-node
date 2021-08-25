"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const fs = require('fs');
const actualizar_1 = __importDefault(require("./routes/actualizar"));
const productos_js_1 = __importDefault(require("./routes/productos.js"));
const guardar_js_1 = __importDefault(require("./routes/guardar.js"));
const borrar_js_1 = __importDefault(require("./routes/borrar.js"));
const http = __importStar(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
//Inicialización de express
const app = express_1.default();
const port = 8080;
const ubicacion = path.resolve(__dirname, 'productos.json');
const publicPath = path.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
//Pug
app.set('view engine', 'pug');
const viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);
app.get('/', (req, res) => {
    res.render('index');
});
//Inicialización WebSocket
const myServer = http.Server(app);
myServer.listen(port, () => console.log('Servidor en puerto ', port));
const myWSServer = socket_io_1.default(myServer);
let productos;
fs.readFile(ubicacion, 'utf-8', (error, data) => {
    if (error || data.length === 0) {
        return console.log('Ocurrió un error', error);
    }
    else {
        productos = JSON.parse(data);
    }
});
myWSServer.on('connection', function (socket) {
    socket.on('new-message', function (data) {
        let idsProductos = [];
        productos.forEach(e => idsProductos.push(e.id));
        let max = Math.max(...idsProductos);
        const newMessage = {
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail,
            id: max + 1,
            user: socket.client.id
        };
        productos.push(newMessage);
        myWSServer.emit('messages', productos);
        let objeto = JSON.stringify(productos);
        //Guardando en el Json
        // fs.writeFile(ubicacion, objeto, (err, e) => {
        //   if (err) {
        //     console.log('Error al guardar', err);
        //   } else {
        //     console.log('Se guardó correctamente');
        //   }
        // });
    });
    socket.on('askData', (data) => {
        socket.emit('messages', productos);
    });
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/actualizar', actualizar_1.default);
app.use('/api/productos', productos_js_1.default);
app.use('/api/guardar', guardar_js_1.default);
app.use('/api/borrar', borrar_js_1.default);
