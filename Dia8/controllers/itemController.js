class ItemController{
    constructor({model,view,prompt}){
        this.model=model;
        this.view=view;
        this.prompt=prompt;
    }
    crear(){
        const datos = this.view.pedirDatosDeCreacion(this.prompt);
        if(!datos.nombre){
            this.view.mostrarMensaje("El nombre es obligatorio: ")
            return;
        }
        const creado = this.model.crear(datos);
        this.view.mostrarMensaje(`Creado con ID ${creado.id}.`);
    }
    listar(){
        const items = this.model.listar();
        if(items.length === 0){
            this.view.mostrarMensaje("No hay items")
        } else {
            this.view.mostrarLista(items);
        }
    }
}
module.exports={ItemController};