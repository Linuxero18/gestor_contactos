const contactosModel = require('../models/contactosModel');

// 🧠 Validaciones específicas de Perú
const validarDatos = (data) => {
  const errores = [];

  // RUC: debe tener 11 dígitos numéricos
  if (!/^\d{11}$/.test(data.rucEmpresa)) {
    errores.push('El RUC debe tener 11 dígitos numéricos');
  }

  // Nombre y apellido obligatorios
  if (!data.nombre || data.nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  }

  if (!data.apellido || data.apellido.trim() === '') {
    errores.push('El apellido es obligatorio');
  }

  // Teléfono y WhatsApp: 9 dígitos y empezar con 9
  const telefonoValido = /^\d{9}$/.test(data.telefono) && data.telefono.startsWith('9');
  const whatsappValido = /^\d{9}$/.test(data.whatsapp) && data.whatsapp.startsWith('9');

  if (!telefonoValido) {
    errores.push('El teléfono debe tener 9 dígitos y empezar con 9');
  }

  if (!whatsappValido) {
    errores.push('El WhatsApp debe tener 9 dígitos y empezar con 9');
  }

  // Correo (opcional pero si está, debe ser válido)
  if (data.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errores.push('El correo no es válido');
  }

  return errores;
};

const getAllContactos = async (req, res) => {
  try {
    const contactos = await contactosModel.getAll();
    res.status(200).json(contactos);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
};

const getContactoById = async (req, res) => {
  const { id } = req.params;
  try {
    const contacto = await contactosModel.getById(id);
    if (!contacto) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.status(200).json(contacto);
  } catch (error) {
    console.error('Error al obtener el contacto:', error);
    res.status(500).json({ error: 'Error al obtener el contacto' });
  }
};

const createContacto = async (req, res) => {
  const data = req.body;
  const errores = validarDatos(data);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const newContactoId = await contactosModel.create(data);
    res.status(201).json({ id: newContactoId, message: 'Contacto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el contacto:', error);
    res.status(500).json({ error: 'Error al crear el contacto' });
  }
};

const updateContacto = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const errores = validarDatos(data);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const actualizado = await contactosModel.update(id, data);
    if (!actualizado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.status(200).json({ message: 'Contacto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error al actualizar el contacto' });
  }
};

const deleteContacto = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await contactosModel.remove(id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.status(200).json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el contacto:', error);
    res.status(500).json({ error: 'Error al eliminar el contacto' });
  }
};

module.exports = {
  getAllContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto
};