const rolesModel = require('../models/rolesModel');

const validarDatos = (data) => {
  const errores = [];
  if (!data.nombre || data.nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  }
  return errores;
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesModel.getAll();
        res.json(roles);
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
}

const getRolById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await rolesModel.getById(id);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(role);
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
}

const createRol = async (req, res) => {
    const data = req.body;
    const errores = validarDatos(data);
    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const newRolId = await rolesModel.create(data);
        res.status(201).json({ id: newRolId, message: 'Rol creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ error: 'Error al crear el rol' });
    }
}

const updateRol = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const errores = validarDatos(data);
    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const actualizado = await rolesModel.update(id, data);
        if (!actualizado) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
}

const deleteRol = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await rolesModel.remove(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        res.status(500).json({ error: 'Error al eliminar el rol' });
    }
}

module.exports = {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};