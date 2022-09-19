const express = require('express')
const app = express()
const Contenedor = require('./CordobaDavid')

const contenedor = new Contenedor("productos.txt") 

contenedor.save({"title": "Libro 1", "price": 5500, "thumbnail": "https://.webp"})
contenedor.save({"title": "Libro 2", "price": 3450.50, "thumbnail": "https://.webp"})
contenedor.save({"title": "Libro 3", "price": 4252, "thumbnail": "https://.webp"}) 


app.get('/productos', (req,res)=>{
    res.send( contenedor.getAll() )
})

app.get('/productoRandom', (req,res)=>{
    
    
    res.send( contenedor.getAleatorio() )
})

const PORT = process.env.PORT || 8080


const server = app.listen(PORT, ()=> console.log(`Http escuchando en ${server.address().port}`))

server.on('error', error => console.log(`error: ${error}`))

