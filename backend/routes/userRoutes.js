const express = require('express');
const router = express.Router();
const userController = require('../controlllers/userController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
// Rutas públicas
router.post('/create', userController.register);
router.post('/login', userController.login);
// Rutas protegidas
router.get('/', verifyToken, authorizeRoles(['Admin', 'Vendedor']), userController.getAllUsers);
router.get('/:documento', verifyToken, authorizeRoles(['Admin', 'Vendedor']), userController.getUserById);
router.put('/:documento', verifyToken, authorizeRoles(['Admin', 'Vendedor']), userController.getUserUpdate);
router.delete('/delete/:documento', verifyToken, authorizeRoles(['Admin']), userController.getUserDelete);
module.exports = router;