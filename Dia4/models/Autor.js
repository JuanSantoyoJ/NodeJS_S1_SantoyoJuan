class Autor{
    constructor(id,nombre){
        this.id=id
        this.nombre=nombre
        this.libros=[]

    }
    agregarLibro(libro){
        if(this.libros.includes(libro)==false){
            this.libros.push(libro);
            libro.setAutor(this);
        }
    }
    quitarLibro(libro){
        this.libros=this.libros
    }
}