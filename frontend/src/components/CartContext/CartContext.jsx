import {createContext,useEffect,useState} from "react"
export const Context =createContext();


const CustomProvider=({children})=>{  
    const [cookies, setCookie] = useState()
    const [cart,setCart]=useState([])
    const [updateCart,setUpdateCart]=useState(false)
    console.log("cookiesss",cookies)
    //console.log("cookies.jwt",cookies.jwt)
    useEffect(() => { 
    fetch(`http://localhost:4000/api/carts/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`${cookies}`
        }
    })
        .then(response => response.json())
        .then(data => {
        //console.log(data.products)
        const items= data.products
        setCart(items) 
        setUpdateCart(false)

        })
        .catch(error => console.error(error))
    },[updateCart])

    const [precioTotal,setprecioTotal]=useState(0)
    const [cantElem,setCantElem]=useState(0) 

    const addItem=async (item,cantidad,cookies)=>{
        //console.log(localStorage.getItem("jwt"))
       // if (!isInCart(item._id)){
        console.log("cookiesss",cookies)
        console.log("cookies.jwt",cookies)
        setCookie(cookies)
        let status=0
            if (cantidad==1){
               await fetch(`http://localhost:4000/api/carts/product/${item._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":`${cookies}`
                    },
                    body:""
                })
                .then(response => {
                   status=response.status
                   console.log("statuuuus",status)
                })
                .catch(error => console.error(error))
            }else{
                const cantidadUpdated={quantity:cantidad}
                
                await fetch(`http://localhost:4000/api/carts/product/${item._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`${cookies}`
                        },
                        body:JSON.stringify(cantidadUpdated)
                    })
                    .then(response => {
                        
                        status= response.status
                        console.log("statuuuus",status)
                    })
                    .catch(error => console.error(error))
                const itemNuevo={...item, quantity:cantidad}
                //setCart([...cart,itemNuevo])              
            }
            setUpdateCart(true)
            return status
           
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


    const removeItem=(id)=>{
        let status=0
         fetch(`http://localhost:4000/api/carts/product/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`${cookies}`
                        }
        })
            .then(response => {
                status= response.status
                setUpdateCart(true)
            })
            .catch(error => console.error(error))
        return status
        /*setCart(
            cart.filter((item)=>{
                if (item.id===id){
                    setprecioTotal(precioTotal-(item.cantidad*item.precio));
                    setCantElem(cantElem-item.cantidad);
                }
                return item.id!==id
            }) 
        )*/
    }

    const clear= ()=>{
        setUpdateCart(true)
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