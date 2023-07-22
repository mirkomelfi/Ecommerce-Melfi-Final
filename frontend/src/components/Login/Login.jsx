import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";
export const Login = () => {
    
    const [cookies, setCookie,removeCookie] = useCookies(["jwt"]);
    const[ loggeado,setLoggeado]=useState(false)
    const[ error,setError]=useState(false)
    const datForm = useRef()

    const desloggear=async()=>{
        await fetch('http://localhost:4000/api/session/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization":`${cookies.jwt}`
            }
        })
        .then(response => console.log(response)/*response.json()*/)
            .then(data => {
                console.log(data)
                console.log("logout",cookies.jwt)
                removeCookie("jwt")
                setLoggeado(false)
            })
            .catch(error => console.error(error))
    }


    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
       if (!cliente.email||!cliente.password){
        setError(true)
        console.log("faltan datos")
       }else{

            await fetch('http://localhost:4000/api/session/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente),
                credentials: "include"
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data.token)
                    //document.cookie = `jwt=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                    setLoggeado(true)
                    console.log("cdj",document.cookie)
                    //setCookie(document.cookie)
                })
                .catch(error => console.error(error))

            e.target.reset() //Reset form
        }       
    }
    
    return (
        <div>
            {!error?(loggeado?
        <Navigate to="/" />
        :
        <>
            <div className="container divForm" >
                <h3>Formulario de Inicio de Sesion</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                </form>
                <button onClick={()=>desloggear()} className="btn btn-primary">Cerrar Sesion</button>
            </div>
        </>):<div className="mb-3">
                        <h2>Datos ingresados incorrectos</h2>
                       
                    </div>
        }
        </div>
    )
}