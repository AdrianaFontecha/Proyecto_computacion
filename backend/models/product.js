const db = require('../config/config');
const Product = {};

Product.findAll = (r) => {
    const sql = `SELECT * from productos`;
    db.query(sql, (err, products) => {
        if (err) {
            console.log('Error al listar los pructos: ', err);
            r(err, null)
        } else {
            r(null, products)
        }
    })
}

Product.findById = (serie, r) => {
    const sql = `SELECT * FROM productos WHERE serie = ?`;
    db.query(sql, [serie], (err, product) => {
        if (err) {
            r(err, null);
        } else {
            r(null, product[0]);
        }
    });
};

Product.create = async (product, result) => {
    console.log(`Data received: ${product}`)
    const sql = `INSERT INTO productos (serie, stockActual, tipo, nombProd, precio, provee) VALUES (?,?,?,?,?,?)`;
    db.query(sql, [
        product.serie,
        product.stockActual,
        product.tipo,
        product.nombProd,
        product.precio,
        product.provee
    ], (err, res) => {
        if (err) {
            console.log('Error al crear al Producto: ', err);
            result(err, null);
        } else {
            result(null, { serie: product.serie, ...product });
        }
    });
};

Product.update = async (product, r) => {
    let fields = [];
    let values = [];
    
    if (product.tipo) {
        fields.push("tipo = ?");
        values.push(product.tipo);
    }
    if (product.nombProd) {
        fields.push("nombProd = ?");
        values.push(product.nombProd);
    }
    if (product.provee) {
        fields.push("provee = ?");
        values.push(product.provee);
    }
    if (product.precio) {
        fields.push("precio = ?");
        values.push(product.precio);
    }
    if (product.stockActual) {
        fields.push("stockActual = ?");
        values.push(product.stockActual);
    }

    const sql = `UPDATE productos SET ${fields.join(", ")} WHERE serie = ?`;
    values.push(product.serie); 
    db.query(sql, values, (err, res) => {
        if (err) {
            console.log('Error al actualizar: ', err);
            res(err, null);
        } else {
            res(null, { serie: product.serie, ...product });
        }
    });
};

Product.delete = (serie, r) => {
    const sql = `DELETE FROM productos WHERE serie = ?`;
    db.query(sql, [serie], (err, res) => {
        if (err) {
            r(err, null);
        } else {
            r(null, res);
        }
    });
};

module.exports = Product;