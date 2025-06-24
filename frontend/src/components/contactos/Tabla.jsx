import { Mail, Phone, PhoneOutgoing, X, Trash2, SquarePen } from 'lucide-react'
import { deleteContacto, createContacto, updateContacto } from '../../services/ContactoService.js'
import Swal from 'sweetalert2'
import { useState } from 'react'
import ModalContacto from './Formulario.jsx'

const Tabla = ({ contactos, setContactos, roles, setRoles }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modoModal, setModoModal] = useState('crear');
    const [contactoEditar, setContactoEditar] = useState(null);

    const handleCreate = async (data) => {
        const res = await createContacto(data);
        if (res.status === 201 || res.status === 200) {
            setContactos(prev => [...prev, res.data]);
            Swal.fire('¡Éxito!', 'Contacto creado.', 'success');
        }
    };

    const handleUpdate = async (data) => {
        const res = await updateContacto(data.idContacto, data);
        if (res.status === 200) {
            setContactos(prev => prev.map(c => c.idContacto === data.idContacto ? data : c));
            Swal.fire('¡Actualizado!', 'Contacto actualizado.', 'success');
        }
    };

    const handleDelete = async (contacto) => {
        const id = contacto.idContacto;

        const confirm = await Swal.fire({
            title: `¿Eliminar a ${contacto.nombre} ${contacto.apellido}?`,
            text: `Esta acción eliminará permanentemente el contacto de la empresa con RUC ${contacto.rucEmpresa}. ¿Deseas continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });

        if (confirm.isConfirmed) {
            try {
                const response = await deleteContacto(id);

                if (response.status === 200) {
                    Swal.fire({
                        title: 'Contacto eliminado',
                        text: 'El contacto ha sido eliminado correctamente.',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false
                    });

                    setContactos(prev => prev.filter(c => c.idContacto !== id));
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
                Swal.fire({
                    title: 'Error al eliminar',
                    text: 'Ocurrió un problema al intentar eliminar el contacto. Intenta nuevamente.',
                    icon: 'error'
                });
            }
        }
    };

    return (
        <>
            <div className='relative'>
                <button className='cursor-pointer absolute -top-15 right-0 mt-2 mr-5 z-10 py-2 px-4 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 hover:scale-105 transform transition duration-300 ease-in-out' onClick={() => {
                    setModoModal('crear');
                    setContactoEditar(null);
                    setModalOpen(true);
                }}>
                    Agregar Nuevo Contacto
                </button>
                <div className='overflow-x-auto shadow-xl rounded-2xl mt-3 mb-5'>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-700 text-white text-md">
                                <th className="py-4 px-3 text-center border border-gray-600">ID Contacto</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Ruc Empresa</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Nombres Completos</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Información</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Celular</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Rol</th>
                                <th className="py-4 px-3 text-center border border-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactos.length === 0 ?
                                (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="flex items-center justify-center text-center py-4 text-red-500 font-bold">
                                                <X width={30} /> No Se Ha Podido Encontrar Al Cliente Que Buscas ...
                                            </div>
                                        </td>
                                    </tr>
                                )
                                : (
                                    contactos.map((contacto) => (
                                        <tr key={contacto.idContacto} className="text-gray-700 hover:bg-gray-100">
                                            <th className="py-1 px-2 text-center border border-gray-300">{contacto.idContacto}</th>
                                            <th className="py-1 px-2 text-center border border-gray-300">{contacto.rucEmpresa}</th>
                                            <th className="py-1 px-2 text-center border border-gray-300">{contacto.nombre} {contacto.apellido}</th>
                                            <th className="py-1 px-2 text-center text-sm border border-gray-300">
                                                <div className="flex items-center justify-center gap-2 text-gray-600"><Mail width={20} /> {contacto.correo}</div>
                                                <div className="flex items-center justify-center gap-2 text-gray-600"><Phone width={20} /> {contacto.whatsapp}</div>
                                            </th>
                                            <th className="py-1 px-2 text-center border border-gray-300">
                                                <div className="flex items-center justify-center gap-2">
                                                    <PhoneOutgoing width={20} /> {contacto.telefono}
                                                </div>
                                            </th>
                                            <th className="py-1 px-2 text-center border border-gray-300">
                                                {roles.find(rol => rol.idRol === contacto.idRol)?.nombreRol || "Sin Rol"}
                                            </th>
                                            <th className="py-1 px-2 text-center border border-gray-300">
                                                <div className='flex items-center justify-center'>
                                                    <SquarePen
                                                        width={25}
                                                        className='cursor-pointer text-amber-500 mx-2'
                                                        onClick={() => {
                                                            setModoModal('editar');
                                                            setContactoEditar(contacto);
                                                            setModalOpen(true);
                                                        }}
                                                    />
                                                    <Trash2
                                                        width={25}
                                                        className='cursor-pointer text-red-500 mx-2'
                                                        onClick={() => handleDelete(contacto)}
                                                    />

                                                </div>
                                            </th>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                    <ModalContacto
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={modoModal === 'crear' ? handleCreate : handleUpdate}
                        contacto={contactoEditar}
                        modo={modoModal}
                        roles={roles}
                    />
                </div>
            </div>
        </>
    )
}

export default Tabla