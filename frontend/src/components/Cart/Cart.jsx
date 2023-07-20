import React from "react";
import {Link, Navigate} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../CartContext/CartContext";

import { useState } from "react";
import { useCookies } from "react-cookie";
import "./Cart.css";

const Cart = () =>{ 
    const [cookies, setCookie] = useCookies();
    const [finalizada, setFinalizada] = useState(false);

    console.log("cookies",cookies)
    console.log(cookies.jwt)

    const {cart, precioTotal, removeItem,clear}=useContext(Context); 

    console.log(cart)

    const finalizarCompra = ()=>{
        fetch(`http://localhost:4000/api/carts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`${cookies.jwt}`
        },
        body:""
    })
        .then(response => response.json())
        .then(data => {
        console.log(data)
        setFinalizada(true)
        clear()
        //const items= data.products
       

        })
        .catch(error => console.error(error))
    
    }
    
    return (
        <>
            <h3>Carrito</h3>
            {!finalizada?(cart.map(producto=>
                <div key= {producto.productId} className="producto">
                    <h1>{producto.productId}</h1>
                   
                    <p>{producto.quantity}</p>
 
                    <button onClick={()=>removeItem(producto.productId)}>Quitar del carrito</button>
                </div>
                
                )):<Navigate to="/finalizada" />}
                 <button onClick={()=>finalizarCompra()}>finalizar Compra</button>
           
        </>
    );
  } 
  
export default Cart;