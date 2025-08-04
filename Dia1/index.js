// CRUD de campers - Versión corregida
const { MongoClient, ObjectId } = require('mongodb');
const readline = require('readline');

// Configuración de la base de datos
const uri = 'mongodb+srv://juandac0512:TnTaocOGFEqB6vcE@cluster0.dtqpjip.mongodb.net/';
const dbName = 'escuela';
const collectionName = 'campers';

// Variables globales
let db, collection;

// Configurar readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ===== FUNCIÓN AUXILIAR PARA HACER PREGUNTAS =====
// IMPORTANTE: Esta función debe estar ANTES de ser usada
function pregunta(texto) {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// ===== FUNCIÓN PARA CONECTAR A MONGODB =====
async function conectarDB() {
    try {
        console.log('🔄 Conectando a MongoDB...');
        const client = new MongoClient(uri);
        await client.connect();

        db = client.db(dbName);
        collection = db.collection(collectionName);

        console.log('✅ ¡Conectado exitosamente!');
        console.log(`📚 Base de datos: ${dbName}`);
        console.log(`👥 Colección: ${collectionName}`);
        return true;
    } catch (error) {
        console.log('❌ Error conectando a MongoDB:', error.message);
        console.log('💡 Asegúrate de que MongoDB esté corriendo');
        console.log('💡 O considera usar MongoDB Atlas (en la nube)');
        return false;
    }
}

// ===== FUNCIÓN PARA MOSTRAR EL MENÚ =====
function mostrarMenu() {
    console.log('\n' + '='.repeat(30));
    console.log('   📚 CRUD DE CAMPERS   ');
    console.log('='.repeat(30));
    console.log('1️⃣  Crear camper nuevo');
    console.log('2️⃣  Ver todos los campers');
    console.log('3️⃣  Buscar camper por ID');
    console.log('4️⃣  Actualizar camper');
    console.log('5️⃣  Eliminar camper');
    console.log('6️⃣  Salir del programa');
    console.log('='.repeat(30));
}

// ===== FUNCIÓN PARA CREAR camper =====
async function crearcamper() {
    try {
        console.log('\n📝 CREANDO NUEVO camper');
        console.log('-'.repeat(25));

        const nombre = await pregunta('👤 Nombre: ');
        const apellido = await pregunta('👤 Apellido: ');
        const edad = await pregunta('🎂 Edad: ');
        const email = await pregunta('📧 Email: ');
        const carrera = await pregunta('🎓 Carrera: ');

        const nuevocamper = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            edad: parseInt(edad) || 0,
            email: email.trim(),
            carrera: carrera.trim(),
            fechaCreacion: new Date()
        };

        const resultado = await collection.insertOne(nuevocamper);
        console.log(`✅ ¡camper creado! ID: ${resultado.insertedId}`);

    } catch (error) {
        console.log('❌ Error creando camper:', error.message);
    }
}

// ===== FUNCIÓN PARA VER TODOS LOS camperS =====
async function verTodoscampers() {
    try {
        console.log('\n📋 TODOS LOS camperS');
        console.log('-'.repeat(25));

        const campers = await collection.find({}).toArray();

        if (campers.length === 0) {
            console.log('📭 No hay campers registrados aún');
            return;
        }

        campers.forEach((camper, index) => {
            console.log(`\n${index + 1}. 🆔 ID: ${camper._id}`);
            console.log(`   👤 Nombre: ${camper.nombre} ${camper.apellido}`);
            console.log(`   🎂 Edad: ${camper.edad} años`);
            console.log(`   📧 Email: ${camper.email}`);
            console.log(`   🎓 Carrera: ${camper.carrera}`);
            if (camper.fechaCreacion) {
                console.log(`   📅 Registrado: ${camper.fechaCreacion.toLocaleDateString()}`);
            }
        });

        console.log(`\n📊 Total de campers: ${campers.length}`);

    } catch (error) {
        console.log('❌ Error obteniendo campers:', error.message);
    }
}

// ===== FUNCIÓN PARA BUSCAR POR ID =====
async function buscarcamperPorId() {
    try {
        const id = await pregunta('\n🔍 Ingresa el ID del camper: ');

        if (!ObjectId.isValid(id)) {
            console.log('❌ El ID no es válido');
            return;
        }

        const camper = await collection.findOne({ _id: new ObjectId(id) });

        if (!camper) {
            console.log('❌ No se encontró ningún camper con ese ID');
            return;
        }

        console.log('\n✅ camper ENCONTRADO');
        console.log('-'.repeat(25));
        console.log(`🆔 ID: ${camper._id}`);
        console.log(`👤 Nombre: ${camper.nombre} ${camper.apellido}`);
        console.log(`🎂 Edad: ${camper.edad} años`);
        console.log(`📧 Email: ${camper.email}`);
        console.log(`🎓 Carrera: ${camper.carrera}`);
        if (camper.fechaCreacion) {
            console.log(`📅 Registrado: ${camper.fechaCreacion.toLocaleDateString()}`);
        }

    } catch (error) {
        console.log('❌ Error buscando camper:', error.message);
    }
}

// ===== FUNCIÓN PARA ACTUALIZAR camper =====
async function actualizarcamper() {
    try {
        const id = await pregunta('\n✏️ Ingresa el ID del camper a actualizar: ');

        if (!ObjectId.isValid(id)) {
            console.log('❌ El ID no es válido');
            return;
        }

        const camperActual = await collection.findOne({ _id: new ObjectId(id) });

        if (!camperActual) {
            console.log('❌ No se encontró ningún camper con ese ID');
            return;
        }

        console.log('\n📋 DATOS ACTUALES:');
        console.log(`👤 Nombre: ${camperActual.nombre}`);
        console.log(`👤 Apellido: ${camperActual.apellido}`);
        console.log(`🎂 Edad: ${camperActual.edad}`);
        console.log(`📧 Email: ${camperActual.email}`);
        console.log(`🎓 Carrera: ${camperActual.carrera}`);

        console.log('\n✏️ NUEVOS DATOS (presiona Enter para mantener el valor actual):');

        const nuevoNombre = await pregunta(`👤 Nuevo nombre [${camperActual.nombre}]: `);
        const nuevoApellido = await pregunta(`👤 Nuevo apellido [${camperActual.apellido}]: `);
        const nuevaEdad = await pregunta(`🎂 Nueva edad [${camperActual.edad}]: `);
        const nuevoEmail = await pregunta(`📧 Nuevo email [${camperActual.email}]: `);
        const nuevaCarrera = await pregunta(`🎓 Nueva carrera [${camperActual.carrera}]: `);

        const datosActualizados = {
            nombre: nuevoNombre.trim() || camperActual.nombre,
            apellido: nuevoApellido.trim() || camperActual.apellido,
            edad: nuevaEdad.trim() ? parseInt(nuevaEdad) : camperActual.edad,
            email: nuevoEmail.trim() || camperActual.email,
            carrera: nuevaCarrera.trim() || camperActual.carrera,
            fechaActualizacion: new Date()
        };

        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        );

        if (resultado.modifiedCount > 0) {
            console.log('✅ ¡camper actualizado exitosamente!');
        } else {
            console.log('ℹ️ No se realizaron cambios');
        }

    } catch (error) {
        console.log('❌ Error actualizando camper:', error.message);
    }
}

// ===== FUNCIÓN PARA ELIMINAR camper =====
async function eliminarcamper() {
    try {
        const id = await pregunta('\n🗑️ Ingresa el ID del camper a eliminar: ');

        if (!ObjectId.isValid(id)) {
            console.log('❌ El ID no es válido');
            return;
        }

        const camper = await collection.findOne({ _id: new ObjectId(id) });

        if (!camper) {
            console.log('❌ No se encontró ningún camper con ese ID');
            return;
        }

        console.log('\n⚠️ camper A ELIMINAR:');
        console.log(`👤 Nombre: ${camper.nombre} ${camper.apellido}`);
        console.log(`📧 Email: ${camper.email}`);
        console.log(`🎓 Carrera: ${camper.carrera}`);

        const confirmacion = await pregunta('\n❓ ¿Estás seguro? Escribe "SI" para confirmar: ');

        if (confirmacion.toUpperCase() === 'SI') {
            const resultado = await collection.deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log('✅ ¡camper eliminado exitosamente!');
            } else {
                console.log('❌ No se pudo eliminar el camper');
            }
        } else {
            console.log('ℹ️ Eliminación cancelada');
        }

    } catch (error) {
        console.log('❌ Error eliminando camper:', error.message);
    }
}

// ===== FUNCIÓN PRINCIPAL DEL MENÚ =====
async function iniciarPrograma() {
    console.log('🚀 Iniciando CRUD de campers...');

    // Intentar conectar a MongoDB
    const conectado = await conectarDB();

    if (!conectado) {
        console.log('\n🤔 ¿Qué quieres hacer?');
        console.log('1. Instalar MongoDB localmente');
        console.log('2. Usar MongoDB Atlas (gratis en la nube)');
        console.log('3. Intentar conectar otra vez');
        console.log('4. Salir');

        const opcion = await pregunta('\nElige una opción (1-4): ');

        if (opcion === '2') {
            console.log('\n📚 Para usar MongoDB Atlas:');
            console.log('1. Ve a https://mongodb.com/atlas');
            console.log('2. Crea una cuenta gratuita');
            console.log('3. Crea un cluster gratuito');
            console.log('4. Obtén tu string de conexión');
            console.log('5. Reemplaza la línea 7 del código con tu URL');
        }

        console.log('\n👋 Cerrando programa...');
        rl.close();
        process.exit(0);
        return;
    }

    console.log('\n🎉 ¡Bienvenido al CRUD de campers!');

    // Bucle principal del menú
    while (true) {
        mostrarMenu();
        const opcion = await pregunta('👉 Selecciona una opción (1-6): ');

        switch (opcion.trim()) {
            case '1':
                await crearcamper();
                break;
            case '2':
                await verTodoscampers();
                break;
            case '3':
                await buscarcamperPorId();
                break;
            case '4':
                await actualizarcamper();
                break;
            case '5':
                await eliminarcamper();
                break;
            case '6':
                console.log('\n👋 ¡Gracias por usar el CRUD de campers!');
                console.log('🚪 Cerrando programa...');
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('❌ Opción no válida. Por favor elige un número del 1 al 6.');
        }

        await pregunta('\n⏸️ Presiona Enter para continuar...');
    }
}

// ===== MANEJO DE ERRORES =====
process.on('uncaughtException', (error) => {
    console.log('❌ Error inesperado:', error.message);
    rl.close();
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.log('❌ Error de promesa:', error.message);
    rl.close();
    process.exit(1);
});

// ===== INICIAR EL PROGRAMA =====
iniciarPrograma().catch((error) => {
    console.log('❌ Error iniciando el programa:', error.message);
    rl.close();
    process.exit(1);
});