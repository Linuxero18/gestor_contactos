const pool = require('../config/db')

const getAll = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE deleted_at IS NULL');
        return rows;
    } catch (error){
        console.error('Error al obtener los roles', error);
        throw error
    }
}

const getById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM roles WHERE idRol = ? AND deleted_at IS NULL',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        throw error;
    }
}

const create = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO roles (nombre) VALUES (?)`,
            [data.nombre]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error al crear rol:', error);
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const [result] = await pool.query(
            `UPDATE roles SET nombre = ? WHERE idRol = ?`,
            [data.nombre, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        throw error;
    }
}

const remove = async (id) => {
    try {
        const [result] = await pool.query(
            `UPDATE roles SET deleted_at = NOW() WHERE idRol = ?`,
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        throw error;
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
