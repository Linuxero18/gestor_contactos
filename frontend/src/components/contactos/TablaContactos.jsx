import Buscar from "../Buscar"
import Tabla from "../contactos/Tabla"
import Paginacion from "../Paginacion"
import { useState, useMemo } from 'react'

const TablaContactos = ({ contactos, setContactos, roles, setRoles }) => {
    const [busqueda, setBusqueda] = useState('')
    const [paginaActual, setPaginaActual] = useState(1)

    const elementosPorPagina = 8
    const dato = 'contacto'   

    const contactosFiltrados = useMemo(() => {
        const query = busqueda.toLowerCase();
        return contactos.filter((contacto) =>
            Object.values(contacto).some((valor) =>
                String(valor).toLowerCase().includes(query)
            )
        );
    }, [busqueda, contactos]);

    //Paginacion slicing
    const totalPaginas = Math.ceil(contactosFiltrados.length / elementosPorPagina)
    const inicio = (paginaActual - 1) * elementosPorPagina
    const fin = inicio + elementosPorPagina
    const contactosPorPagina = contactosFiltrados.slice(inicio, fin)

    return (
        <>
            <Buscar
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setPaginaActual={setPaginaActual}
                dato={dato}
            />
            <Tabla 
                contactos={contactosPorPagina}
                setContactos={setContactos}
                roles={roles}
                setRoles={setRoles}
            />
            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                cambiarPagina={setPaginaActual}
            />
        </>
    )
}

export default TablaContactos
