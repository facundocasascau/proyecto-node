const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = app.listen(port, () => {
    console.log(`Se está escuchando por el puerto:${port}`)
})
server.on("error", error => console.log(`Ha ocurrido un error: ${error}`))
const ubicacion = path.resolve(__dirname, './productos.json');

let visitasItems = 0
app.get('/items', (request, response) => {
    visitasItems++
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        if (error) {
            return console.log('Ocurió un error', error);
        }
        let productos = JSON.parse(data);
        response.json(productos);

    });
 
});

let visitasRandom = 0;
app.get('/item-ramdon', (request, response) => {
    visitasRandom++
    fs.readFile(ubicacion, 'utf-8', (error, data) => {
        if (error) {
            return console.log('Ocurió un error', error);
        }
        let productos = JSON.parse(data);
        let aleatorio = Math.floor((Math.random() * productos.length))
        
        response.json({
           item:productos[aleatorio].title,
    });

});
});

app.get('/visitas', (request, response) => {
    response.json({
        Items: `${visitasItems}`,
        ItemsRandom: `${visitasRandom}`
    });
})