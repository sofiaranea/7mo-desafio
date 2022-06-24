const express = require('express')
const Contenedor = require('../container/container')
const {Router} = express
const productRouter = Router()

//Container
const itemProd = 'productos.json'
const containerProduct = new Contenedor(itemProd)

function auth(req, res, next) {
    //console.log(req.headers)
    if ('admin' in req.headers) {
        next()
    } else {
        res.status(400)
        res.send('Usuario no admin.')
    }
}
//Devuelve todos los productos
productRouter.get('/', (req, res) => {
    res.json(containerProduct.getAll())
})
//Devuelve un producto por su ID
productRouter.get('/:id', (req, res) => {
    const query = req.params.id
    //console.log(query)
    const id = containerProduct.getById(query)

    if (id) {
        res.json(id)
    } else {
        res.status(400).send({error: 'No se encontró el producto.'})
    }
})
//Agrega un producto
productRouter.post('/', auth, (req, res) => {
    res.send(containerProduct.save(req.body))
})
//Elimina un producto
productRouter.delete('/:id', (req, res) => {
    const query = req.params.id
    const id = containerProduct.getById(query)
    if (id) {
        containerProduct.deleteById(query)
        res.send({message: 'Producto eliminado con éxito.'})
    } else {
        res.status(400).send({error: 'El producto no existe.'})
    }
})

module.exports = productRouter