const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosController');

// Obtener todos los contactos
router.get('/', contactosController.getAllContactos);

// Obtener un contacto por ID
router.get('/:id', contactosController.getContactoById);

// Crear un nuevo contacto
router.post('/', contactosController.createContacto);

// Actualizar un contacto existente
router.put('/:id', contactosController.updateContacto);

// Eliminar (soft delete) un contacto
router.delete('/:id', contactosController.deleteContacto);

module.exports = router;
