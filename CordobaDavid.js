const fs = require('fs')

class Contenedor{
    constructor(archive){
        this.archive= archive;
        this.products = [];
    }

    async read(){
        try{
            let dB = await fs.promises.readFile(this.archive, 'utf-8')
            return dB
        }catch(e){
            console.log("error")
        }
    }

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    } 

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
            await  fs.promises.writeFile(this.archive, JSON.stringify(this.products, null, 4))
        }catch(e){
            console.error("No se pudo guardar" + e)
        }
    }

    getById(id){
        let resultId = this.products.find(prod => prod.id == id)
        return resultId
    }
    
    modifById(id, producto){
        try {
            producto.id = id
            this.getAll().splice(id-1, 1, producto)
            return this.getById(id)
        } catch(error){
            return error
        } 
    }

    getAll(){
        return this.products
    }

    getAleatorio(){
        return this.products[Math.floor(Math.random() * this.products.length)]
    }

    deleteById(id){
        const index = this.products.findIndex(prod => prod.id == id)
        this.products.splice(index, 1)
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, "[]")
    }

}
module.exports = Contenedor


const agregando = new Contenedor('productos.txt')
agregando.save(
    {
        nombre:'david',
        precio: '150'

    }
)