import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');


router.get('/', (req, response) => {
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
router.get('/:id', (req, response) => {
    const posicion = parseInt(req.params.id)
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        let productos = JSON.parse(data);
        let match = productos.filter(x => x.id == posicion)
        if (match.length == 0) {
            response.json({
                error: 'el id no corresponde a ningún producto',

            });
        } else {
            response.json({
                item: match,
            });
        }
    });
});


//Almacenar un producto (post)

router.post('/guardar', (req, response) => {

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
    console.log(body)
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

export default router;