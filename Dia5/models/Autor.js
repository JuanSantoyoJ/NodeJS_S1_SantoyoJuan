class Autor {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
        this.libros = []

    }
    agregarLibro(libro) {
        if (this.libros.includes(libro) == false) {
            this.libros.push(libro);
            libro.setAutor(this);
        }
    }
    quitarLibro(libro) {
        const indice = this.libros.indexOf(libro);
        if (indice !== -1) {
            this.libros.splice(indice, 1);
        }
    }
}

module.exports = Autor;