import { useRef, useState } from "react"

export const CreacionUser = () => {

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const [boton,setBoton]=useState("")
    
    const botonSeleccionado= (botonSelec) => {
        //setBoton(botonSelec)
    }
    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        console.log(e)
        console.log(boton)
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const userData = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        console.log(userData)
        /*fetch('http://localhost:4000/api/session/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
            .then(data => {
                document.cookie = `jwt=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                console.log(data.token)
            })
            .catch(error => console.error(error))
        e.target.reset() //Reset form
        */
    }
    return (
        <div className="container divForm" >
            <h3>Creacion de producto</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="id_user" className="form-label">Id del Usuario</label>
                    <input type="text" className="form-control" name="first_name" required />
                </div>

                <button type="submit" onClick={botonSeleccionado("Visualizar")} className="btn btn-primary">Visualizar</button>
                <button type="submit" onClick={botonSeleccionado("Modificar")} className="btn btn-primary">Modificar Rol</button>
                <button type="submit" onClick={botonSeleccionado("Eliminar")} className="btn btn-primary">Eliminar</button>
            </form>
        </div>
    )
}