const express = require('express');
const router = express.Router();
const productController = require('../controlllers/productController');
const userController = require('../controlllers/userController')
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/login', userController.login);

router.get('/', productController.getAllProducts);
router.get('/:serie',  productController.getProductById);

router.post('/create', productController.register);
module.exports = router