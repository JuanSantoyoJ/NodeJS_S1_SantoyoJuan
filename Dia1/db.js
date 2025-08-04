// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://juandac0512:TnTaocOGFEqB6vcE@cluster0.dtqpjip.mongodb.net/'; // Cambia si usas Atlas
const client = new MongoClient(uri);

async function conectar() {
  await client.connect();
  return client.db('escuela').collection('estudiantes');
}

module.exports = { conectar };
