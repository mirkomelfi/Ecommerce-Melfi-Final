import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
//Components 
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import { Products } from './Products/Products';
import {ItemListContainer} from './ItemListContainer/ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer'
import { Mensaje } from './Mensaje/Mensaje';
import CustomProvider from './CartContext/CartContext';
import Cart from './Cart/Cart';

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <CustomProvider> 
        <Navbar/>
        <Routes>
          <Route path="/category/:category"  element={<ItemListContainer greeting="¡Bienvenido al sitio web de la Escuela! ¡Esperamos contar con lo que está buscando!"/>}/>
            
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido al sitio web de la Escuela! ¡Esperamos contar con lo que está buscando!"/>}/>
          <Route path="/producto/:_id" element={<ItemDetailContainer />}/> 
          <Route path="/cart" element={<Cart />}/> 
          <Route path="/finalizada" element={<Mensaje greeting= "compra finalizada"/>}/> 
          <Route path="/rol" element={<Mensaje greeting= "Su rol no le permite acceso a esta ruta"/>}/> 
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        footer
        </CustomProvider> 
      </BrowserRouter>

    </>

  )
}