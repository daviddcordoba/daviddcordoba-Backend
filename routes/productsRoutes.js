const { Router } = require ('express');
const Contenedor = require('../CordobaDavid');
const routerProduct = Router();


const productContainer = new Contenedor('productos.txt')

routerProduct.get('/', (req, res) => {
    res.json(productContainer.getAll())
})

routerProduct.get('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    res.json(productContainer.getById(num))
})

routerProduct.post('/', (req, res) => {
    const product = req.body
    res.json(productContainer.save(product))
})

routerProduct.put('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    const product = req.body
    res.json(productContainer.modifById(num, product))
})

routerProduct.delete('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    res.json(productContainer.deleteById(num))
})


module.exports = routerProduct