from flask import Blueprint
from controllers.contactosController import (
    get_all_contactos,
    get_contacto_by_id,
    create_contacto,
    update_contacto,
    delete_contacto
)

contactos = Blueprint('contactos', __name__)

@contactos.route('/contactos', methods=['GET'])
def obtener_contactos():
    return get_all_contactos()

@contactos.route('/contactos/<int:id>', methods=['GET'])
def obtener_contacto(id):
    return get_contacto_by_id(id)

@contactos.route('/contactos', methods=['POST'])
def agregar_contacto():
    return create_contacto()

@contactos.route('/contactos/<int:id>', methods=['PUT'])
def modificar_contacto(id):
    return update_contacto(id)

@contactos.route('/contactos/<int:id>', methods=['DELETE'])
def eliminar_contacto(id):
    return delete_contacto(id)
