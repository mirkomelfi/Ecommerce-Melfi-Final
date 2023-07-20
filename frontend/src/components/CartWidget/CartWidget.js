import React from "react";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../CartContext/CartContext";

const CartWidget = () =>{
  const {cantElem}=useContext(Context);

    return (
        <>
          <Link to="/cart">
            <AiOutlineShoppingCart/>
            {cantElem!==0&&  <p> {cantElem} </p>}
            
          </Link>
        </>
   
    );
  }
  
export {CartWidget};
 