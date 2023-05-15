import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ComboContext from "../../Context/ComboContext";

export const ComboIndex = () => {
    const { combos, getCombos, deleteCombo } = useContext(ComboContext);
    useEffect(() => {
    getCombos();
    }, [])
    
    return (
        <div className="mt-12">
           <div className="flex justify-end m-2 p-2">
                <Link to="/combos/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Nuevo combo</Link>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Categoria
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => {
                        return (
                            <tr key={service.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{service.id}</td>
                                <td className="px-6 py-4">{service.name}</td>
                                <td className="px-6 py-4">{service.category_name}</td>
                                <td className="px-6 py-4">{service.price}</td>
                                <td className="px-6 py-4 space-x-2">
                                 <Link to={`/services/${service.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                                 <button onClick={() => deleteService(service.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
                                </td>
                               
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }

