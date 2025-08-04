// app.js
const yargs = require('yargs');
const { listar, crear, actualizar, eliminar } = require('./operaciones');

yargs
  .command('listar', 'Listar estudiantes', {}, listar)
  .command('crear', 'Crear estudiante', {
    nombre: { type: 'string', demandOption: true },
    edad: { type: 'number', demandOption: true },
    curso: { type: 'string', demandOption: true }
  }, crear)
  .command('actualizar', 'Actualizar estudiante', {
    id: { type: 'string', demandOption: true },
    nombre: { type: 'string' },
    edad: { type: 'number' },
    curso: { type: 'string' }
  }, actualizar)
  .command('eliminar', 'Eliminar estudiante', {
    id: { type: 'string', demandOption: true }
  }, eliminar)
  .demandCommand()
  .help()
  .argv;
