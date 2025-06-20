from flask import Flask, request, jsonify
from models.contactosModel import Contacto

def get_all_contactos():
    try:
        contactos = Contacto.get_all_contactos()
        return jsonify(contactos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_contacto_by_id(id):
    try:
        contacto = Contacto.get_contacto_by_id(id)
        if contacto:
            return jsonify(contacto), 200
        return jsonify({"error": "Contacto no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def create_contacto():
    try:
        data = request.json
        id_contacto = Contacto.create_contacto(
            rucEmpresa=data.get("rucEmpresa"),
            nombre=data.get("nombre"),
            apellido=data.get("apellido"),
            correo=data.get("correo"),
            telefono=data.get("telefono"),
            whatsapp=data.get("whatsapp"),
            contacto=data.get("contacto"),
            rol=data.get("rol")
        )
        return jsonify({"id_contacto": id_contacto, "message": "Contacto creado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_contacto(id):
    try:
        data = request.json
        rows_updated = Contacto.update_contacto(
            id=id,
            rucEmpresa=data.get("rucEmpresa"),
            nombre=data.get("nombre"),
            apellido=data.get("apellido"),
            correo=data.get("correo"),
            telefono=data.get("telefono"),
            whatsapp=data.get("whatsapp"),
            contacto=data.get("contacto"),
            rol=data.get("rol")
        )
        if rows_updated > 0:
            return jsonify({"message": "Contacto actualizado exitosamente"}), 200
        return jsonify({"error": "Contacto no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_contacto(id):
    try:
        rows_deleted = Contacto.delete_contacto(id)
        if rows_deleted > 0:
            return jsonify({"message": "Contacto eliminado exitosamente"}), 200
        return jsonify({"error": "Contacto no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

