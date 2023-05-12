import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import CategoryContext from "../../Context/CategoryContext";


export const CategoryIndex = () => {
  const { categories, getCategories, deleteCategory } = useContext(CategoryContext);
  useEffect(() => {
  getCategories();
  }, [])
  
  return (
  <div className="mt-12">
    <div className="flex justify-end m-2 p-2">
      <Link to="/categories/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Nueva categoria</Link>
  </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Id
        </th>
        <th scope="col" class="px-6 py-3">
          Nombre
        </th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
    </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{category.id}</td>
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4 space-x-2">
                <Link to={`/categories/${category.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                <button onClick={() => deleteCategory(category.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
              </td>
              </tr>
            );
          })}
        </tbody>
    </table>
</div>

      </table>
    </div>
  </div>
  )
}
