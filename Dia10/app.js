const prompt= require('prompt-sync')();

const UsuarioModel = require('./models/userModel');
const UsuarioView = require('./views/userView');
const UsuarioController = require('./controllers/userController');

const modelo = new UsuarioModel();
const vista = new UsuarioView();
const controlador = new UsuarioController(modelo, vista);

async function main() {
    let opcion = '';
    do {
        console.log('\n=== Menú de Usuarios ===');
        console.log('1. Registrar usuario');
        console.log('2. Listar usuarios');
        console.log('0. Salir');
        opcion = prompt('Opción: ');

        switch (opcion) {
            case '1':
                await controlador.registrarUsuario();
                break;
            case '2':
                await controlador.mostrarUsuarios();
                break;
            case '0':
                console.log('👋 Saliendo...');
                break;
            default:
                console.log('❗ Opción inválida.');
        }
    } while (opcion !== '0');
}

main();