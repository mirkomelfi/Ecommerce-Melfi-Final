import React from "react";
import { useState, useEffect } from "react";
import {ItemDetail} from "../ItemDetail/ItemDetail"
import {useParams} from "react-router-dom";


const ItemDetailContainer = () =>{

    const {_id}= useParams();
    console.log("id",_id)
    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(() => { 
        fetch(`http://localhost:4000/api/products/${_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
      })
        .then(response => response.json())
        .then(data => {
            const producto= data
            setListaProd(producto)
            console.log(producto)
        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <>
          {loading ? <p>Cargando...</p> : <ItemDetail listaProd={listaProd}/>}
        </>
    );
  } 
  
export default ItemDetailContainer;