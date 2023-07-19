import { useState } from "react";
export const getProducts=()=>{
    const [listaProd,setListaProd]= useState([]);
    const [loading,setLoading]= useState(true);
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
        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    return listaProd
}
