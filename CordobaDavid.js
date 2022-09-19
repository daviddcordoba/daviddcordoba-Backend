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
const contenedor = new Contenedor("productos.txt") 

 contenedor.save({"title": "Libro 1", "price": 5500, "thumbnail": "https://.webp"})
contenedor.save({"title": "Libro 2", "price": 3450.50, "thumbnail": "https://.webp"})
contenedor.save({"title": "Libro 3", "price": 4252, "thumbnail": "https://.webp"}) 

/* console.log(contenedor.getById(3)) */
//console.log(contenedor.getAll())
// contenedor.deleteAll()