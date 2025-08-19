const ItemView = {
    mostrarMenu(){
        console.log("\nCrud de Items (MVC)");
        console.log("1. Crear");
        console.log("2. Listar");
        console.log("3. Ver por ID");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("\n0. Salir");
    },
    pedirOpcion(prompt){
        const op = prompt("Elige una opcion: ");
        return op.trim();
    },
    pedirDatosDeCreacion(prompt){
        const nombre = prompt("Nombre: ").trim();
        const descripcion = prompt("Descripcion: ").trim();
        return {nombre,descripcion};
    },
    mostrarMensaje(msg){
        console.log(`\n${msg}`)
    },
    mostrarLista(items) {
        console.log("\n=== Lista de Items ===");
        items.forEach(i => {
            console.log(`${i.id}. ${i.nombre} - ${i.descripcion}`);
        });
    }
}
module.exports={ItemView};