const express = require('express');
const router = express.Router();
const productController = require('../controlllers/productController');
const userController = require('../controlllers/userController')
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/login', userController.login);

router.get('/', verifyToken, authorizeRoles(['Admin','Vendedor']), productController.getAllProducts);
router.get('/:serie', verifyToken, authorizeRoles(['Admin','Vendedor']), productController.getProductById);

router.post('/create', verifyToken, authorizeRoles(['Admin']), productController.register);
module.exports = router