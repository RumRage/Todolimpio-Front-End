import { Routes, Route, Link } from 'react-router-dom';
import { CategoryProvider } from './Context/CategoryContext';
import { ProductProvider } from './Context/ProductContext';

import { Home } from './components/Home';

import { CategoryIndex } from './components/categories/CategoryIndex';
import { CategoryCreate } from './components/categories/CategoryCreate';
import { CategoryEdit } from './components/categories/CategoryEdit';

import { ProductIndex } from './components/products/ProductIndex';
import { ProductCreate } from './components/products/ProductCreate';
import { ProductEdit } from './components/products/ProductEdit';

import { DisposableIndex } from './components/disposables/DisposableIndex';
import { DisposableCreate } from './components/disposables/DisposableCreate';
import { DisposableEdit } from './components/disposables/DisposableEdit';

function App() {
  return (
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
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/products">Productos</Link>
            </li>
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/disposable">Descartables</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/categories" element={<CategoryProvider><CategoryIndex /></CategoryProvider>} />
          <Route path="/categories/create" element={<CategoryProvider><CategoryCreate /></CategoryProvider>} />
          <Route path="/categories/:id/edit" element={<CategoryProvider><CategoryEdit /></CategoryProvider>} />
          <Route path="/products" element={<ProductProvider><ProductIndex /></ProductProvider>} />
          <Route path="/products/create" element={<ProductProvider><ProductCreate /></ProductProvider>} />
          <Route path="/products/:id/edit" element={<ProductProvider><ProductEdit /></ProductProvider>} />
          <Route path="/disposables" element={<DisposableProvider><DisposableIndex /></DisposableProvider>} />
          <Route path="/disposables/create" element={<DisposableProvider><DisposableCreate /></DisposableProvider>} />
          <Route path="/disposables/:id/edit" element={<DisposableProvider><DisposableEdit /></DisposableProvider>} />
        </Routes>
        </div>
      </div> 
  );
}

export default App;
