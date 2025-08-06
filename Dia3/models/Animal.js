class Animal{
    constructor(nombre){
        this.nombre=nombre
    }
    hablar(){
        console.log(`${this.nombre} esta haciendo un ruido`)
    }
}


module.exports=Animal;