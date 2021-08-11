import express from 'express';
const fs = require('fs');
const router = express.Router();

const path = require('path');
const ubicacion = path.resolve(__dirname, '../productos.json');



//Almacenar un producto (post)

router.post('/', (req, response) => {
    const body = req.body;
    if (
        !body.title ||
        !body.price ||
        !body.thumbnail ||
        typeof body.title != 'string' ||
        //typeof body.price != 'number' ||
        typeof body.thumbnail != 'string'
    ) {
        response.render('guardar', {layout: 'datosincorrectos'})
    }
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
    console.log(body)
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
                response.render('guardar', {layout: 'guardar'})
            }
        });
    });

});

export default router;
