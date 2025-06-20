from database.conexion import get_connection

class Contacto:
    @staticmethod
    def get_all_contactos():
        con = get_connection()
        cursor = con.cursor(dictionary=True)
        cursor.execute('SELECT * FROM contactos WHERE deleted_at IS NULL')
        respuesta = cursor.fetchall()
        cursor.close()
        con.close()
        return respuesta
    
    @staticmethod
    def get_contacto_by_id(id):
        con = get_connection()
        cursor = con.cursor(dictionary=True)
        cursor.execute('SELECT * FROM contactos WHERE idContacto = %s AND deleted_at IS NULL', (id,))
        respuesta = cursor.fetchone()
        cursor.close()
        con.close()
        return respuesta
    
    @staticmethod
    def create_contacto(rucEmpresa, nombre, apellido, correo, telefono, whatsapp, contacto, rol):
        con = get_connection()
        cursor = con.cursor()
        cursor.execute('INSERT INTO contactos (rucEmpresa, nombre, apellido, correo, telefono, whatsapp, contacto, rol) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                       (rucEmpresa, nombre, apellido, correo, telefono, whatsapp, contacto, rol))
        con.commit()
        cursor.close()
        con.close()
        return cursor.lastrowid
    
    @staticmethod
    def update_contacto(id, rucEmpresa, nombre, apellido, correo, telefono, whatsapp, contacto, rol):
        con = get_connection()
        cursor = con.cursor()
        cursor.execute('UPDATE contactos SET rucEmpresa = %s, nombre = %s, apellido = %s, correo = %s, telefono = %s, whatsapp = %s, contacto = %s, rol = %s WHERE idContacto = %s',
                       (rucEmpresa, nombre, apellido, correo, telefono, whatsapp, contacto, rol, id))
        con.commit()
        cursor.close()
        con.close()
        return cursor.rowcount
    
    @staticmethod
    def delete_contacto(id):
        con = get_connection()
        cursor = con.cursor()
        cursor.execute('UPDATE contactos SET deleted_at = NOW() WHERE idContacto = %s', (id,))
        con.commit()
        cursor.close()
        con.close()
        return cursor.rowcount

