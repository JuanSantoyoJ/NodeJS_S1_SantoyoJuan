class Persona{
    constructor(nombre,edad){
        this.nombre=nombre;
        this.edad=edad;
    }
    saludar(){
        console.log(`Hola, mi nombre es ${this.nombre} y mi edad ${this.edad}`)
    }
};
module.exports=Persona;