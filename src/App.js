import { Routes, Route, Link } from 'react-router-dom';
import { CategoryProvider } from './Context/CategoryContext';
import { ProductProvider } from './Context/ProductContext';
import { DisposableProvider } from './Context/DisposableContext';
import { ServiceProvider } from './Context/ServiceContext';
import { ComboProvider } from './Context/ComboContext';

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

import { ServiceIndex } from './components/services/ServiceIndex';
import { ServiceCreate } from './components/services/ServiceCreate';
import { ServiceEdit } from './components/services/ServiceEdit';

import { ComboIndex } from './components/combos/ComboIndex';
import { ComboCreate } from './components/combos/ComboCreate';
import { ComboEdit } from './components/combos/ComboEdit';


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
              <Link to="/disposables">Descartables</Link>
            </li>
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/services">Servicios</Link>
            </li>
            <li className='m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
              <Link to="/combos">Combos</Link>
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
          <Route path="/services" element={<ServiceProvider><ServiceIndex /></ServiceProvider>} />
          <Route path="/services/create" element={<ServiceProvider><ServiceCreate /></ServiceProvider>} />
          <Route path="/services/:id/edit" element={<ServiceProvider><ServiceEdit /></ServiceProvider>} />
          <Route path="/combos" element={<ComboProvider><ComboIndex /></ComboProvider>} />
          <Route path="/combos/create" element={<ComboProvider><ComboCreate /></ComboProvider>} />
          <Route path="/combos/:id/edit" element={<ComboProvider><ComboEdit /></ComboProvider>} />
        </Routes>
        </div>
      </div> 
  );
}

export default App;
