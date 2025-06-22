from flask import request, jsonify
from models.contactosModel import ContactosModel
from datetime import datetime


def get_all_contactos():
    try:
        contactos = ContactosModel.get_all()

        # Convertir datetime a string para JSON
        for contacto in contactos:
            if contacto.get('created_at'):
                contacto['created_at'] = contacto['created_at'].isoformat()
            if contacto.get('updated_at'):
                contacto['updated_at'] = contacto['updated_at'].isoformat()
            if contacto.get('deleted_at'):
                contacto['deleted_at'] = contacto['deleted_at'].isoformat()

        return jsonify({
            'success': True,
            'data': contactos,
            'message': 'Contactos obtenidos exitosamente'
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al obtener contactos: {str(e)}'
        }), 500


def get_contacto_by_id(contacto_id):
    try:
        contacto = ContactosModel.get_by_id(contacto_id)

        if not contacto:
            return jsonify({
                'success': False,
                'message': 'Contacto no encontrado'
            }), 404

        # Convertir datetime a string para JSON
        if contacto.get('created_at'):
            contacto['created_at'] = contacto['created_at'].isoformat()
        if contacto.get('updated_at'):
            contacto['updated_at'] = contacto['updated_at'].isoformat()
        if contacto.get('deleted_at'):
            contacto['deleted_at'] = contacto['deleted_at'].isoformat()

        return jsonify({
            'success': True,
            'data': contacto,
            'message': 'Contacto obtenido exitosamente'
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al obtener el contacto: {str(e)}'
        }), 500


def create_contacto():
    try:
        data = request.get_json()

        # Validaciones básicas
        if not data:
            return jsonify({
                'success': False,
                'message': 'No se enviaron datos'
            }), 400

        # Verificar si ya existe un contacto con el mismo correo
        # if data.get('correo'):
        #     existing_contacto = ContactosModel.get_by_email(data['correo'])
        #     if existing_contacto:
        #         return jsonify({
        #             'success': False,
        #             'message': 'Ya existe un contacto con este correo electrónico'
        #         }), 409

        # Crear nuevo contacto
        contacto_id = ContactosModel.create(data)

        if contacto_id:
            # Obtener el contacto creado para devolverlo
            nuevo_contacto = ContactosModel.get_by_id(contacto_id)

            # Convertir datetime a string para JSON
            if nuevo_contacto.get('created_at'):
                nuevo_contacto['created_at'] = nuevo_contacto['created_at'].isoformat(
                )
            if nuevo_contacto.get('updated_at'):
                nuevo_contacto['updated_at'] = nuevo_contacto['updated_at'].isoformat(
                )

            return jsonify({
                'success': True,
                'data': nuevo_contacto,
                'message': 'Contacto creado exitosamente'
            }), 201
        else:
            return jsonify({
                'success': False,
                'message': 'Error al crear el contacto'
            }), 500

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al crear contacto: {str(e)}'
        }), 500


def update_contacto(contacto_id):
    try:
        # Verificar si el contacto existe
        contacto_existente = ContactosModel.get_by_id(contacto_id)
        if not contacto_existente:
            return jsonify({
                'success': False,
                'message': 'Contacto no encontrado'
            }), 404

        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No se enviaron datos para actualizar'
            }), 400

        # Verificar si el correo ya existe en otro contacto
        # if data.get('correo') and data['correo'] != contacto_existente.get('correo'):
        #     existing_contacto = ContactosModel.get_by_email(data['correo'])
        #     if existing_contacto and existing_contacto['idContacto'] != contacto_id:
        #         return jsonify({
        #             'success': False,
        #             'message': 'Ya existe otro contacto con este correo electrónico'
        #         }), 409

        # Actualizar contacto
        updated = ContactosModel.update(contacto_id, data)

        if updated:
            # Obtener el contacto actualizado
            contacto_actualizado = ContactosModel.get_by_id(contacto_id)

            # Convertir datetime a string para JSON
            if contacto_actualizado.get('created_at'):
                contacto_actualizado['created_at'] = contacto_actualizado['created_at'].isoformat(
                )
            if contacto_actualizado.get('updated_at'):
                contacto_actualizado['updated_at'] = contacto_actualizado['updated_at'].isoformat(
                )

            return jsonify({
                'success': True,
                'data': contacto_actualizado,
                'message': 'Contacto actualizado exitosamente'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Error al actualizar el contacto'
            }), 500

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al actualizar contacto: {str(e)}'
        }), 500


def delete_contacto(contacto_id):
    try:
        # Verificar si el contacto existe
        contacto_existente = ContactosModel.get_by_id(contacto_id)
        if not contacto_existente:
            return jsonify({
                'success': False,
                'message': 'Contacto no encontrado'
            }), 404

        # Eliminar contacto
        deleted = ContactosModel.delete(contacto_id)

        if deleted:
            return jsonify({
                'success': True,
                'message': 'Contacto eliminado exitosamente'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Error al eliminar el contacto'
            }), 500

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al eliminar contacto: {str(e)}'
        }), 500
