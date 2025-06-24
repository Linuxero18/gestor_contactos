const express = require('express')
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Obtener todos los roles
router.get('/', rolesController.getAllRoles);

// Obtener un rol por ID
router.get('/:id', rolesController.getRolById);

// Crear un nuevo rol
router.post('/', rolesController.createRol);

// Actualizar un rol existente
router.put('/:id', rolesController.updateRol);

// Eliminar (soft delete) un rol
router.delete('/:id', rolesController.deleteRol);

module.exports = router;
