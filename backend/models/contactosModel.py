from database.conexion import get_connection
from datetime import datetime
import mysql.connector


class ContactosModel:
    @staticmethod
    def get_all():
        try:
            connection = get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
                SELECT idContacto, rucEmpresa, nombre, apellido, correo, telefono, 
                       whatsapp, contacto, rol, created_at, updated_at, deleted_at
                FROM contactos 
                WHERE deleted_at IS NULL
                ORDER BY idContacto
            """
            
            cursor.execute(query)
            contactos = cursor.fetchall()

            cursor.close()
            connection.close()

            return contactos

        except mysql.connector.Error as e:
            print(f"Error al obtener contactos: {e}")
            return []

    @staticmethod
    def get_by_id(contacto_id):
        try:
            connection = get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
                SELECT idContacto, rucEmpresa, nombre, apellido, correo, telefono, 
                       whatsapp, contacto, rol, created_at, updated_at, deleted_at
                FROM contactos 
                WHERE idContacto = %s AND deleted_at IS NULL
            """

            cursor.execute(query, (contacto_id,))
            contacto = cursor.fetchone()

            cursor.close()
            connection.close()

            return contacto

        except mysql.connector.Error as e:
            print(f"Error al obtener contacto por ID: {e}")
            return None

    @staticmethod
    def get_by_email(correo):
        try:
            connection = get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
                SELECT idContacto, rucEmpresa, nombre, apellido, correo, telefono, 
                       whatsapp, contacto, rol, created_at, updated_at, deleted_at
                FROM contactos 
                WHERE correo = %s AND deleted_at IS NULL
            """

            cursor.execute(query, (correo,))
            contacto = cursor.fetchone()

            cursor.close()
            connection.close()

            return contacto

        except mysql.connector.Error as e:
            print(f"Error al obtener contacto por email: {e}")
            return None

    @staticmethod
    def create(data):
        try:
            connection = get_connection()
            cursor = connection.cursor()

            query = """
                INSERT INTO contactos (rucEmpresa, nombre, apellido, correo, telefono, 
                                     whatsapp, contacto, rol, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

            now = datetime.now()
            values = (
                data.get('rucEmpresa'),
                data.get('nombre'),
                data.get('apellido'),
                data.get('correo'),
                data.get('telefono'),
                data.get('whatsapp'),
                data.get('contacto'),
                data.get('rol'),
                now,
                now
            )

            cursor.execute(query, values)
            connection.commit()

            # Obtener el ID del contacto creado
            contacto_id = cursor.lastrowid

            cursor.close()
            connection.close()

            return contacto_id

        except mysql.connector.Error as e:
            print(f"Error al crear contacto: {e}")
            return None

    @staticmethod
    def update(contacto_id, data):
        try:
            connection = get_connection()
            cursor = connection.cursor()

            # Construir la consulta dinámicamente
            fields = []
            values = []

            if 'rucEmpresa' in data:
                fields.append("rucEmpresa = %s")
                values.append(data['rucEmpresa'])
            if 'nombre' in data:
                fields.append("nombre = %s")
                values.append(data['nombre'])
            if 'apellido' in data:
                fields.append("apellido = %s")
                values.append(data['apellido'])
            if 'correo' in data:
                fields.append("correo = %s")
                values.append(data['correo'])
            if 'telefono' in data:
                fields.append("telefono = %s")
                values.append(data['telefono'])
            if 'whatsapp' in data:
                fields.append("whatsapp = %s")
                values.append(data['whatsapp'])
            if 'contacto' in data:
                fields.append("contacto = %s")
                values.append(data['contacto'])
            if 'rol' in data:
                fields.append("rol = %s")
                values.append(data['rol'])

            # Siempre actualizar updated_at
            fields.append("updated_at = %s")
            values.append(datetime.now())

            # Agregar el ID al final
            values.append(contacto_id)

            query = f"""
                UPDATE contactos 
                SET {', '.join(fields)}
                WHERE idContacto = %s AND deleted_at IS NULL
            """

            cursor.execute(query, values)
            connection.commit()

            affected_rows = cursor.rowcount

            cursor.close()
            connection.close()

            return affected_rows > 0

        except mysql.connector.Error as e:
            print(f"Error al actualizar contacto: {e}")
            return False

    @staticmethod
    def delete(contacto_id):
        try:
            connection = get_connection()
            cursor = connection.cursor()

            query = """
                UPDATE contactos 
                SET deleted_at = %s, updated_at = %s
                WHERE idContacto = %s AND deleted_at IS NULL
            """

            now = datetime.now()
            cursor.execute(query, (now, now, contacto_id))
            connection.commit()

            affected_rows = cursor.rowcount

            cursor.close()
            connection.close()

            return affected_rows > 0

        except mysql.connector.Error as e:
            print(f"Error al eliminar contacto: {e}")
            return False

    @staticmethod
    def get_by_ruc(ruc_empresa):
        try:
            connection = get_connection()
            cursor = connection.cursor(dictionary=True)

            query = """
                SELECT idContacto, rucEmpresa, nombre, apellido, correo, telefono, 
                       whatsapp, contacto, rol, created_at, updated_at, deleted_at
                FROM contactos 
                WHERE rucEmpresa = %s AND deleted_at IS NULL
                ORDER BY created_at DESC
            """

            cursor.execute(query, (ruc_empresa,))
            contactos = cursor.fetchall()

            cursor.close()
            connection.close()

            return contactos

        except mysql.connector.Error as e:
            print(f"Error al obtener contactos por RUC: {e}")
            return []
