import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext } from "react";
import {Link} from "react-router-dom";
import { Context } from "../CartContext/CartContext";
import { Navigate } from "react-router-dom";

const ItemDetail = ({listaProd})=>{

    const [agregado,setAgregado]=useState(false)
    const [error,setError]=useState(false)
    const {addItem}=useContext(Context);
    

    const onAdd= async(contador)=>{
       const response=  await addItem(listaProd,contador)
       console.log("response",response)
       if (response==200){
        setAgregado(true);
        }
        else{
            setError(true);
            if (response==401){
                console.log("error al agregar. no esta loggeado")
            }
            if (response==400){
                console.log("error al agregar. su rol no le permite")
            }
        }
    }

    return (
        <div className="producto">
            <h1>{listaProd.tile}</h1>
            <p>{listaProd.description}</p>
            <h3>${listaProd.price}</h3>
            { !error 
            ?
            (!agregado ? <ItemCount stock={listaProd.stock} onAdd={onAdd}/> :  <><Link to="/cart"><button>Ver Carrito</button></Link> <Link to="/"><button>Seguir comprando</button></Link></>)
            :
            <Navigate to="/login" />
            }
            
        </div>

    )
}
export  {ItemDetail}