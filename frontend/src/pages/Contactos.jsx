import { useEffect, useState } from "react"
import TablaContactos from "../components/contactos/TablaContactos.jsx"
import { getContactos } from "../services/ContactoService.js"
import SpinnerLoading from "../components/SpinnerLoading.jsx"
import { getRoles } from "../services/RolesService.js"

const Contactos = () => {

  const [contactos, setContactos] = useState([])
  const [roles, setRoles] = useState([])
  const [cargando, setCargando] = useState(true)

  const axiosContactosRoles = async () => {
    const responseContactos = await getContactos();
    const responseRoles = await getRoles();
    setContactos(responseContactos.data);
    setRoles(responseRoles.data);
    setCargando(false);
  }

  useEffect(() => {
    axiosContactosRoles();
  }, [])

  if (cargando) {
    return <SpinnerLoading />
  }

  return (
    <div className="w-[85%] max-w-12xl min-w-xl px-4 sm:px-6 lg:px-8 mx-auto mt-8 font-comfortaa">
      <TablaContactos contactos={contactos} setContactos={setContactos} roles={roles} setRoles={setRoles}/>
    </div>
  )
}

export default Contactos
