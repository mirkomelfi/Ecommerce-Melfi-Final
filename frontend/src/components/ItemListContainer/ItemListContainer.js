import React from "react";
import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import {ItemList} from "../ItemList/ItemList"
import {useParams} from "react-router-dom";
import { getProducts } from "../MongoDB/MongoDB";

export const ItemListContainer = ({greeting}) =>{
    const {category}= useParams();
    console.log("category",category)
    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);
   // if (!category){
      useEffect(() => { 
        fetch(`http://localhost:4000/api/products/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }//,
          //body:""
        })
          .then(response => response.json())
          .then(data => {
              const productos= data.docs
              setListaProd(productos)
              console.log(productos)
          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])
   /* }
    else{
      useEffect(() => { 
       // console.log(`ruta http://localhost:4000/api/products/category=${category}`)
        fetch(`http://localhost:4000/api/products/?category=${category}`, {
          //fetch(`http://localhost:4000/api/products`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }//,
          //body:""
        })
          .then(response => response.json())
          .then(data => {
              const productos= data.docs
              setListaProd(productos)
              console.log("productos en categorry",productos)
          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])
          
    }*/

    return (
      <div>
        <h1 className="greeting">{greeting}</h1>
        {loading ? <p>cargando...</p> : <ItemList listaProd={listaProd}/>}
      </div>
   
    );
  }
  
