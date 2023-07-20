import { useRef } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"
export const Login = () => {
    const[ loggeado,setLoggeado]=useState(false)
    const datForm = useRef()
    

    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        console.log(cliente)

        fetch('http://localhost:4000/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.token)
                document.cookie = `jwt=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                setLoggeado(true)
            })
            .catch(error => console.error(error))

        e.target.reset() //Reset form
    }
    
    return (
        <div>
            {loggeado?
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
            </div>
        </>
        }
        </div>
    )
}