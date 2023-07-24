import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState } from "react";
import {Link} from "react-router-dom";

import { Navigate } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";



const ItemDetail = ({pid,listaProd})=>{

    const [agregado,setAgregado]=useState(false)
    const [error,setError]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    
    const onAdd = async (contador) => {
        try {

            const cantidadUpdated={quantity:contador}
                
            const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/carts/product/${pid}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(cantidadUpdated),
                    credentials:"include"
                })

            const data = await response.json()

            if(response.status == 200) {
                setAgregado(true);
                setError(false)
     
            } else {

                if (response.status==401){
                    setError(true)
                    setMensaje(data.message)
                }

            }


        } catch (error) {
            console.error(error);
        }
    }


    return (<div className="producto">
        { (!error)
            ? 
        <div>
            
            <h1>{listaProd.tile}</h1>
            <p>{listaProd.description}</p>
            <h3>${listaProd.price}</h3>

            {(!agregado ? <ItemCount stock={listaProd.stock} onAdd={onAdd}/> :  <><Link to="/cart"><button>Ver Carrito</button></Link> <Link to="/"><button>Seguir comprando</button></Link></>)}
        </div>
        : 
            <Mensaje msj={mensaje} />

            }
            
        </div>

    )
}
export  {ItemDetail}