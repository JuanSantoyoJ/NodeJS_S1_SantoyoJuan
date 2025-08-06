const Persona = require('./models/Persona');
const CuentaBancaria = require('./models/CuentaBancaria');
const Perro = require('./models/Perro')
const pedro = new Persona('Pedro',25);
pedro.saludar();

const cuenta = new CuentaBancaria('Pedro',1000);
console.log("Saldo inicial: ", cuenta.verSaldo())
cuenta.depositar(500);
console.log("Saldo despues del deposito: ", cuenta.verSaldo())
console.log(cuenta.verSaldo());

const animal1 = new Perro("Paco")
animal1.hablar();