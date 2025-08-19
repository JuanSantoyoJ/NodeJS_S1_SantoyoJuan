const prompt = require("prompt-sync")();
const {ItemModel} = require('./models/itemModel');
const {ItemView} = require('./views/itemView');
const {ItemController} = require('./controllers/itemController');

const model = new ItemModel();
const view = ItemView
const controller = new ItemController({model,view,prompt});

function main(){
    let salir = false;
    while(!salir){
        view.mostrarMenu();
        const op = view.pedirOpcion(prompt);
        switch(op){
            case "1":
                controller.crear();
            case "2":
                controller.listar();
            case "0":
                salir = true;
                view.mostrarMensaje("Hasta Luego")
            default:
                view.mostrarMensaje("Opcion no valida")
        }
    }
}
main();