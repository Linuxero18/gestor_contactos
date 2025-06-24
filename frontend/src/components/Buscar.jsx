import { Search, X } from 'lucide-react'
import { useRef } from 'react'

const Buscar = ({ busqueda, setBusqueda, setPaginaActual, dato }) => {

    const inputRef = useRef(null)

    //Enfocar Input 
    const enfocarInput = () => {
        inputRef.current?.focus()
    }

    //Limpiar imput
    const limpiarInput = () => {
        setBusqueda('')
    }

    return (
        <>
            <div className='text-left'>
                <div className='flex items-center gap-4 ml-5'>
                    <input ref={inputRef} type="text" placeholder={`Buscar ${dato} ...`} className="w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-400" value={busqueda} onChange={(e) => {
                        setBusqueda(e.target.value)
                        setPaginaActual(1)
                    }} />
                    {
                        busqueda.length === 0 ? (
                            <Search width={25} onClick={enfocarInput} className='cursor-pointer text-blue-500' />
                        ) : (
                            <X width={25} onClick={limpiarInput} className='cursor-pointer text-red-500' />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Buscar
