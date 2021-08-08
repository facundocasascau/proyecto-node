const express = require('express');
const path = require('path');
const fs = require('fs');
const { brotliDecompress } = require('zlib');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Estamos ATR')
})

const server = app.listen(port, () => {
    console.log(`Se está escuchando por el puerto:${port}`)
})
server.on("error", error => console.log(`Ha ocurrido un error: ${error}`))
const ubicacion = path.resolve(__dirname, './productos.json');


//Listar en forma total (get)
app.get('/productos', (req, response) => {
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        if (error || data.length == 0) {
            response.json({
                error: 'no hay productos cargados',
            });
            return console.log('Ocurió un error', error);
        } else {
            let productos = JSON.parse(data);
            response.json(productos);
        }

    });

});

//Listar en forma individual (get)
app.get('/productos/:id', (req, response) => {
    const posicion = parseInt(req.params.id)
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        if (posicion < 1 || posicion > productos.length) {
            response.json({
                error: 'producto no encontrado',
            });
        } else {

          let match = productos.filter(x => x.id == posicion

        )
            response.json({
                item: match,
            });
        }
    });
});


//Almacenar un producto (post)
app.use(express.json());
app.post('/guardar', (req, response) => {

    const body = req.body;
    if (
        !body.title ||
        !body.price ||
        !body.thumbnail ||
        typeof body.title != 'string' ||
        typeof body.price != 'number' ||
        typeof body.thumbnail != 'string'
    ) {
        return response.status(400).json({
            msg: 'Ingrese title, price y url de foto por favor',
        });
    }
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        let obj = {
            title: body.title,
            price: body.price,
            thumbnail: body.thumbnail,
            id: productos.length + 1
        };
        productos.push(obj);
        let objeto = JSON.stringify(productos);
        fs.writeFile(ubicacion, objeto, (err, e) => {
            if (err) {
                console.log('Error al guardar', err);
            } else {
                console.log('Se guardó correctamente');
                response.status(201).json({
                    data: obj,
                });
            }
        });
    });

});

//Actualizar un producto (put)

app.put('/productos/:id', (req, response) => {
    const posicion = parseInt(req.params.id)
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        if (posicion < 1 || posicion > productos.length) {
            response.json({
                error: 'producto no encontrado',
            });
        } else {

          let match = productos.filter(x => x.id == posicion

        )
            response.json({
                item: match,
            });
        }
    });
});
