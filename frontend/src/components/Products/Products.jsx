import { useRef } from "react"
export const Products = () => {

    //const datForm = useRef()
    
        //Consultar los datos del formulario
       // e.preventDefault()
        //const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        //const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        fetch('http://localhost:4000/api/products', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body:""
        })
            .then(response => response.json())
            .then(data => {
                const productos= data.docs
                console.log(productos)
            })
            .catch(error => console.error(error))

        //e.target.reset() //Reset form
    
    return (
        <div className="container divProd" >
            <h3>Productos</h3>

               
        </div>
    )
}