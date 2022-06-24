const fs = require('fs')

class Contenedor {
    constructor(file) {
        //console.log('contenedor ok!')
        this.file = file
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }
    
    write() {
        fs.promises.writeFile(this.file, JSON.stringify(this.data))
        .then(() => {
            console.log('Data saved!')
        })
        .catch(error => console.log(error))
    }
    read() {
        fs.promises.readFile(this.file)
        .then(data => {
            this.data = JSON.parse(data)
            //console.log('Data loaded!')
        })
        .catch(error => console.log(error))
    }
    getLastId() {
        const l = this.data.length
        if (l < 1) return 0
        return this.data[this.data.length - 1].id
    }
    save(obj) {
        obj['id'] = this.data.length + 1
        this.data.push(obj)
        this.write()
        
        return obj
    }
    getById(id) {
        return this.data.find(p => p.id == id)
    }
    getAll() {
        return this.data
    }
    deleteById(id) {
        const idx = this.data.findIndex(p => p.id == id)
        this.data.splice(idx, 1)
        this.write()
    }
    deleteByIdCart(cart, id) {
        //console.log(cart)
        const carrito = this.data.find(p => p.id == cart)
        const productos = carrito.products
        const idx = productos.findIndex(p => p.id == id)
        productos.splice(idx, 1)
        this.write()
        //console.log(productos)
        this.write()
        //console.log(array)
    }
    deleteAll() {
        this.data = []
        this.write()
    }
    editById(id, campo, valor) {
        const productos = this.getAll
        //console.log(productos)
        const prodEdit = productos.find(p => p.id == id)
        //console.log(idx)
        prodEdit[campo] = valor
        //console.log(prodEdit)
    }
    editByBody(obj, id) {
        obj['id'] = id
        const idx = this.getAll().findIndex(p => p.id === obj)
        this.getAll().splice(idx, 1, obj)
        this.write()
    }
}

module.exports = Contenedor