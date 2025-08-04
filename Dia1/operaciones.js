// operaciones.js
const { ObjectId } = require('mongodb');
const { conectar } = require('./db');

async function listar() {
  const col = await conectar();
  const data = await col.find().toArray();
  console.table(data);
}

async function crear({ nombre, edad, curso }) {
  const col = await conectar();
  const res = await col.insertOne({ nombre, edad, curso });
  console.log('✅ Estudiante creado con ID:', res.insertedId);
}

async function actualizar({ id, ...campos }) {
  const col = await conectar();
  const res = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: campos }
  );
  console.log('🛠️ Documentos modificados:', res.modifiedCount);
}

async function eliminar({ id }) {
  const col = await conectar();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  console.log('🗑️ Documentos eliminados:', res.deletedCount);
}

module.exports = { listar, crear, actualizar, eliminar };
