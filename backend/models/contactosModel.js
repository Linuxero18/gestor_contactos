const pool = require('../database/db');

const getAll = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM contactos WHERE deleted_at IS NULL');
        return rows;
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        throw error;
    }
};

const getById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM contactos WHERE idContacto = ? AND deleted_at IS NULL',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error al obtener el contacto:', error);
        throw error;
    }
};

const create = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO contactos 
        (rucEmpresa, nombre, apellido, correo, telefono, whatsapp, idRol) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.rucEmpresa,
                data.nombre,
                data.apellido,
                data.correo,
                data.telefono,
                data.whatsapp,
                data.idRol
            ]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error al crear contacto:', error);
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const [result] = await pool.query(
            `UPDATE contactos 
       SET rucEmpresa = ?, nombre = ?, apellido = ?, correo = ?, telefono = ?, whatsapp = ?, idRol = ? 
       WHERE idContacto = ?`,
            [
                data.rucEmpresa,
                data.nombre,
                data.apellido,
                data.correo,
                data.telefono,
                data.whatsapp,
                data.idRol,
                id
            ]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const [result] = await pool.query(
            `UPDATE contactos 
       SET deleted_at = NOW() 
       WHERE idContacto = ?`,
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al eliminar el contacto:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
