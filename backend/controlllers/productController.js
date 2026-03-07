const Product = require("../models/product");

module.exports = {
    getAllProducts(req, res) {
        Product.findAll((err, products) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    msg: "Error al listar productos",
                    error: err,
                })
            }
            return res.status(200).json({
                success: true,
                msg: "Lista de produtos",
                data: products,
            })
        })
    },

    getProductById(req, res) {
        const serie = req.params.serie;
        Product.findById(serie, (err, product) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error al consultar el producto",
                    error: err,
                });
            }
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Producto encontrado",
                data: product,
            });
        });
    },
}