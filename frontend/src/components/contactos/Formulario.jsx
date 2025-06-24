import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { X, Building2, User, Mail, Phone, MessageCircle, Shield } from 'lucide-react';

const ModalContacto = ({ isOpen, onClose, onSubmit, roles, modo = 'crear', contacto = {} }) => {
    const [formData, setFormData] = useState({
        rucEmpresa: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        whatsapp: '',
        idRol: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (modo === 'editar' && contacto) {
            setFormData(contacto);
        } else {
            setFormData({
                rucEmpresa: '',
                nombre: '',
                apellido: '',
                correo: '',
                telefono: '',
                whatsapp: '',
                idRol: ''
            });
        }
        setErrors({});
    }, [modo, contacto]);

    // Validación de RUC peruano (11 dígitos)
    const validateRUC = (ruc) => {
        const rucPattern = /^(10|15|17|20)\d{9}$/;
        return rucPattern.test(ruc);
    };

    // Validación de teléfono peruano (celular: 9 dígitos empezando por 9, fijo: 7-8 dígitos)
    const validatePhone = (phone) => {
        const cellPattern = /^9\d{8}$/; // Celular: 9 dígitos empezando por 9
        const landlinePattern = /^[1-7]\d{6,7}$/; // Fijo: 7-8 dígitos empezando por 1-7
        return cellPattern.test(phone) || landlinePattern.test(phone);
    };

    // Validación de email
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Validación de nombres (solo letras y espacios)
    const validateName = (name) => {
        const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return namePattern.test(name) && name.trim().length >= 2;
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'rucEmpresa':
                if (!value) {
                    error = 'RUC es requerido';
                } else if (!validateRUC(value)) {
                    error = 'RUC debe tener 11 dígitos y empezar con 10, 15, 17 o 20';
                }
                break;
            case 'nombre':
                if (!value) {
                    error = 'Nombre es requerido';
                } else if (!validateName(value)) {
                    error = 'Nombre debe contener solo letras y tener al menos 2 caracteres';
                }
                break;
            case 'apellido':
                if (!value) {
                    error = 'Apellido es requerido';
                } else if (!validateName(value)) {
                    error = 'Apellido debe contener solo letras y tener al menos 2 caracteres';
                }
                break;
            case 'correo':
                if (!value) {
                    error = 'Correo es requerido';
                }
                else if (value && !validateEmail(value)) {
                    error = 'Formato de correo inválido';
                }
                break;
            case 'telefono':
                if (!value) {
                    error = 'Teléfono es requerido';
                } else if (!validatePhone(value)) {
                    error = 'Teléfono inválido. Celular: 9 dígitos (ej: 987654321), Fijo: 7-8 dígitos';
                }
                break;
            case 'whatsapp':
                if (!value) {
                    error = 'WhatsApp es requerido';
                } else if (!/^9\d{8}$/.test(value)) {
                    error = 'WhatsApp debe ser un celular de 9 dígitos empezando por 9';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Filtrar caracteres para campos específicos
        let filteredValue = value;
        
        if (name === 'rucEmpresa' || name === 'telefono' || name === 'whatsapp') {
            filteredValue = value.replace(/\D/g, ''); // Solo números
        } else if (name === 'nombre' || name === 'apellido') {
            filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Solo letras y espacios
        }
        
        setFormData(prev => ({ ...prev, [name]: filteredValue }));
        
        // Validar en tiempo real
        const error = validateField(name, filteredValue);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async () => {
        // Validar todos los campos
        const newErrors = {};
        const requiredFields = ['rucEmpresa', 'nombre', 'apellido', 'correo', 'telefono', 'whatsapp'];
        
        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        // Validar correo si está presente
        if (formData.correo) {
            const emailError = validateField('correo', formData.correo);
            if (emailError) newErrors.correo = emailError;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return Swal.fire('Datos incorrectos', 'Por favor corrige los errores en el formulario', 'error');
        }

        await onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">

                    {/* Header con gradiente */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
                        <button
                            onClick={onClose}
                            className="cursor-pointer focus:outline-blue-500 absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 rounded-full p-3">
                                <User size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {modo === 'crear' ? 'Nuevo Contacto' : 'Editar Contacto'}
                                </h2>
                                <p className="text-white/80 text-sm">
                                    {modo === 'crear' ? 'Agregar un nuevo contacto al sistema' : 'Modificar información del contacto'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido del formulario */}
                    <div className="p-6 space-y-5">

                        {/* RUC Empresa */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">RUC Empresa *</label>
                            <div className="relative">
                                <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    name="rucEmpresa"
                                    value={formData.rucEmpresa}
                                    onChange={handleChange}
                                    placeholder="20123456789"
                                    maxLength={11}
                                    className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                        errors.rucEmpresa 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                    }`}
                                />
                            </div>
                            {errors.rucEmpresa && <p className="text-red-500 text-xs mt-1">{errors.rucEmpresa}</p>}
                        </div>

                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Juan Carlos"
                                        className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                            errors.nombre 
                                                ? 'border-red-300 focus:ring-red-500' 
                                                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                        }`}
                                    />
                                </div>
                                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido *</label>
                                <input
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="García López"
                                    className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                        errors.apellido 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                    }`}
                                />
                                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
                            </div>
                        </div>

                        {/* Correo */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico *</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    placeholder="juan@empresa.com"
                                    type="email"
                                    className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                        errors.correo 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                    }`}
                                />
                            </div>
                            {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
                        </div>

                        {/* Teléfono y WhatsApp */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="987654321"
                                        maxLength={9}
                                        className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                            errors.telefono 
                                                ? 'border-red-300 focus:ring-red-500' 
                                                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                        }`}
                                    />
                                </div>
                                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp *</label>
                                <div className="relative">
                                    <MessageCircle size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="987654321"
                                        maxLength={9}
                                        className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                                            errors.whatsapp 
                                                ? 'border-red-300 focus:ring-red-500' 
                                                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                                        }`}
                                    />
                                </div>
                                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                            </div>
                        </div>

                        {/* Rol */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                            <div className="relative">
                                <Shield size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                <select
                                    name="idRol"
                                    value={formData.idRol}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Selecciona un rol</option>
                                    {roles.map((rol) => (
                                        <option key={rol.idRol} value={rol.idRol}>{rol.nombreRol}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-3.5 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer con botones */}
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer focus:outline-blue-500 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer focus:outline-blue-500 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            {modo === 'crear' ? 'Crear Contacto' : 'Actualizar Contacto'}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ModalContacto;