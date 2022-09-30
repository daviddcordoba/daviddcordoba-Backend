const express = require('express')
const app = express()

const routerProduct = require('./routes/productsRoutes')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',routerProduct)
app.use(express.static('public'))

const PORT = process.env.PORT || 8080


const server = app.listen(PORT, ()=> console.log(`Http escuchando en ${server.address().port}`))

server.on('error', error => console.log(`error: ${error}`))

