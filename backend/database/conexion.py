import mysql.connector
from mysql.connector import Error 

def get_connection():
    try:
        con = mysql.connector.connect(
            host='localhost', 
            port=3306, 
            user='root',
            password='',
            database='gestor_contactos'
        )
        if con.is_connected():
            print('✅ Conexión exitosa a la base de datos')
            return con
    except Error as e:
        print(f"❌ Error al conectar a la base de datos: {e}")
        return None
    
# Prueba De Conexión exitosa
#get_connection();
