import {createContext,useState} from "react"
export const Context =createContext();
import { useCookies } from "react-cookie";


const CustomProvider=({children})=>{  
    const [cart,setCart]=useState([])
    const [precioTotal,setprecioTotal]=useState(0)
    const [cantElem,setCantElem]=useState(0) 
    const [cookies, setCookie] = useCookies();
    console.log(cookies.jwt)
    const addItem= async (item,cantidad)=>{
        //console.log(localStorage.getItem("jwt"))
       // if (!isInCart(item._id)){
            if (cantidad==1){
                await fetch(`http://localhost:4000/api/carts/product/${item._id}`, {
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
                })
                .catch(error => console.error(error))
            }else{
                const cantidadUpdated={quantity:cantidad}
                
                await fetch(`http://localhost:4000/api/carts/product/${item._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`${cookies.jwt}`
                        },
                        body:JSON.stringify(cantidadUpdated)
                    })
                const itemNuevo={...item, quantity:cantidad}
                //setCart([...cart,itemNuevo])              
            }
            return 1
        /*}else{
            setCart(
                cart.map(prod=>{
                    if (prod.id===item.id){
                        return {...prod,cantidad:prod.cantidad+cantidad}
                    }else{
                        return prod
                    }
                })
            )
        }  // agregar o sumar la cantidad nueva 
        setprecioTotal(precioTotal + item.precio*cantidad) 
        setCantElem(cantElem+cantidad)*/
    
    }


    const removeItem= (id)=>{
        setCart(
            cart.filter((item)=>{
                if (item.id===id){
                    setprecioTotal(precioTotal-(item.cantidad*item.precio));
                    setCantElem(cantElem-item.cantidad);
                }
                return item.id!==id
            }) 
        )
    }

    const clear= ()=>{
        setCart([])
        setprecioTotal(0)
        setCantElem(0) 
    }
    
    const isInCart= (id)=> {
        const busqueda=cart.find((elemento)=>elemento.id===id)
        if (busqueda) {return true } else {return false}
    }

    return(
        <Context.Provider value={{cart,precioTotal,cantElem,addItem,removeItem,clear}}>
            {children}
        </Context.Provider>

    )

}

export default CustomProvider 