import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext } from "react";
import {Link} from "react-router-dom";
import { Context } from "../CartContext/CartContext";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const ItemDetail = ({listaProd})=>{

    const [cookies, setCookie] = useCookies();
    console.log(cookies)
    const [agregado,setAgregado]=useState(false)
    const [errorLog,setErrorLog]=useState(false)
    const [errorRol,setErrorRol]=useState(false)
    const {addItem}=useContext(Context);
    

    const onAdd= async(contador)=>{
       const response=  await addItem(listaProd,contador,cookies.jwt)
       console.log("response onADD",response)
       if (response==200){
        setAgregado(true);
        console.log("agregado",agregado)
        setErrorLog(false);
        setErrorRol(false);
        }
        else{
            
            if (response==401){
                setErrorLog(true);
                console.log("error al agregar. no esta loggeado")
            }
            if (response==400){
                setErrorRol(true);
                console.log("error al agregar. su rol no le permite")
            }
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