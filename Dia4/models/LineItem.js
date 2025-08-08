class Lineitem {
    constructor(producto, cantidad, precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }
    subtotal() {
        return this.cantidad * this.precioUnitario;
    }
}
module.exports = Lineitem;