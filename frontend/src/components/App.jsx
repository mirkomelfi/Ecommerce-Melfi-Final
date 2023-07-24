import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import {ItemListContainer} from './ItemListContainer/ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer'
import Cart from './Cart/Cart';
import { CreacionUser } from './CreacionUser/CreacionUser';
import { UserPassword } from './UserPassword/UserPassword';
import { ChangePass } from './UserPassword/ChangePass';


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/category/:category"  element={<ItemListContainer greeting="¡Bienvenido al sitio web de la Escuela! ¡Esperamos contar con lo que está buscando!"/>}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido al sitio web de la Escuela! ¡Esperamos contar con lo que está buscando!"/>}/>
          <Route path="/producto/:_id" element={<ItemDetailContainer />}/> 
          <Route path="/cart" element={<Cart />}/> 
          <Route path="/admin" element={<CreacionUser />}/> 
          <Route path="/password"element={<UserPassword />}/> 
          <Route path="/newpassword"element={<ChangePass />}/> 
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}