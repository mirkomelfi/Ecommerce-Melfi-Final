import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState } from "react";
import {Link} from "react-router-dom";

import { Navigate } from "react-router-dom";



const ItemDetail = ({pid,listaProd})=>{

    const [agregado,setAgregado]=useState(false)
    const [errorLog,setErrorLog]=useState(false)
    const [errorRol,setErrorRol]=useState(false)
    
    const onAdd = async (contador) => {
        try {

            const cantidadUpdated={quantity:contador}
                
            const response = await fetch(`http://localhost:4000/api/carts/product/${pid}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(cantidadUpdated),
                    credentials:"include"
                })

            const data = await response.json()
            
            if(data.status == 200) {
                console.log("Se ha agregado el producto")
                setAgregado(true);
                setErrorLog(false);
                setErrorRol(false);
            } else {
                console.log(data)
                if (response==401){
                    setErrorLog(true);
                    console.log("error al agregar. no esta loggeado")
                }
                if (response==400){
                    setErrorRol(true);
                    console.log("error al agregar. su rol no le permite")
                }
            }


        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="producto">
            <h1>{listaProd.tile}</h1>
            <p>{listaProd.description}</p>
            <h3>${listaProd.price}</h3>
            { (!errorLog && !errorRol)
            ?
            (!agregado ? <ItemCount stock={listaProd.stock} onAdd={onAdd}/> :  <><Link to="/cart"><button>Ver Carrito</button></Link> <Link to="/"><button>Seguir comprando</button></Link></>)
            : (errorLog ?
            <Navigate to="/login" />:<Navigate to="/rol" />)
            }
            
        </div>

    )
}
export  {ItemDetail}