const {ItemModel}=require("./models/itemModel");
const model = new ItemModel();

model.crear({nombre:"lapicero",descripcion:"azul"})
console.log(model.listar());