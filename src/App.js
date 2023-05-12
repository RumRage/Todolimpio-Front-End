import { Routes, Route, Link } from 'react-router-dom';
import { CategoryProvider } from './Context/CategoryContext';

import { Home } from './components/Home';
import { CategoryIndex } from './components/categories/CategoryIndex';
import { CategoryCreate } from './components/categories/CategoryCreate';
import { CategoryEdit } from './components/categories/CategoryEdit';

function App() {
  return (
    <CategoryProvider>
      <div className="bg-slate-200">
        <div className="max-w-7xl mx-auto min-h-screen">
        <nav>
          <ul className='flex'>
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/">Home</Link>
            </li>
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/categories">Categorias</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryIndex />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/:id/edit" element={<CategoryEdit />} />
        </Routes>
        </div>
      </div> 
    </CategoryProvider>
  );
}

export default App;
