const express = require('express')
const Contenedor = require('../container/container')
const {Router} = express
const cartRouter = Router()

//Container
const itemCart = 'carrito.json'
const containerCart = new Contenedor(itemCart)

//Base, devuelve los articulos del carrito.
cartRouter.get('/', (req, res) => {
    res.json(containerCart.getAll())
})
//Crea una nueva id de carrito.
cartRouter.post('/', (req, res) => {
    obj = {...req.body, ...{products: []}}
    res.json(containerCart.save(obj))
})
//Devuelve un array de productos de un carritoID determinado.
cartRouter.get('/:id/products', (req, res) => {
    const cartID = req.params.id
    const cart = containerCart.getById(cartID)
    res.json(cart)
})
//Agrega productos a un carritoID determinado (implementado en user.html).
cartRouter.post('/:id/products', (req, res) => {
    const product = req.body
    const cartID = req.params.id
    const cart = containerCart.getById(cartID)
    cart.products.push(product)

    const newObj = containerCart.editByBody(cart, cartID)

    res.json(newObj)
})
//Elimina un carritoID completo
cartRouter.delete('/:id', (req, res) => {
    const cartID = req.params.id
    const cart = containerCart.getById(cartID)
    if (cart) {
        containerCart.deleteById(cart)
        res.send({message: 'Carrito eliminado con éxito.'})
    } else {
        res.status(400).send({error: 'El carrito no existe.'})
    }
})
//Elimina un producto de un carritoID
cartRouter.delete('/:id/product/:idProd', (req, res) => {
    const cartID = req.params.id
    const productID = req.params.idProd

    const cart = containerCart.getById(cartID)
    if (cart) { //verificamos si el carrito existe, caso contrario retorna status(400)
        const productos = cart.products
        const idx = productos.findIndex(p => p.id == productID)
        if (idx === -1) { //verificamos si el producto existe dentro del carrito existente, caso contrario retorna status(400)
            res.status(400).send({error: 'El producto no existe dentro del carrito.'})
        } else {//producto existente, envia los params al container y elimina el producto
            containerCart.deleteByIdCart(cartID, productID)
            res.send({message: 'Se elimino el producto con exito'})
        }
    } else {
        res.status(400).send({error: 'El carrito no existe.'})
    }
})


module.exports = cartRouter