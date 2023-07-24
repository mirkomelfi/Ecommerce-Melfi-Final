import { useRef, useState } from "react"

export const CreacionUser = () => {

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const [boton,setBoton]=useState(null)
    const [addRol,setAddRol]=useState(false)
    
    const botonSeleccionado= (botonSelec) => {
        setBoton(botonSelec)
        if (botonSelec=="Modificar"){
            setAddRol(true)
        }
        console.log(botonSelec)
        return;
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const userData = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (boton=="Visualizar"){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:"include"
            }).then(response => response.json())
                .then(data => {
                    if (data.status==200){
                        console.log(data.message)
                    }
                    if (data.status==400){
                        console.log(data.message)
                    }
                })
                .catch(error => console.error(error))
        }
        if (boton=="Modificar"){
            const newRol=userData.rol
            console.log(newRol)
            if (!newRol){
                console.log("dato invalido")
            }else{
                const modifiedRol= {rol:newRol}
                await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:  JSON.stringify(modifiedRol),
                    credentials:"include"
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.error(error))
            }
        }
            
        if (boton=="Eliminar"){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:"include"
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => console.error(error))
        }

        e.target.reset() //Reset form
        
    }
    return (
        <div className="container divAdmin" >
            <h3>Vista ADMIN</h3>
            <h4>Control de Usuarios</h4>
            {boton?
                <div className="container divForm" >
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="id_user" className="form-label">Id del Usuario</label>
                            <input type="text" className="form-control" name="id_user" required />
                        </div>
                        {addRol&&<div className="mb-3">
                            <label htmlFor="id_user" className="form-label">Rol</label>
                            <input type="text" className="form-control" name="rol" required />
                        </div>}
                        <button type="submit"  className="btn btn-primary">Solicitar</button>
                    </form>
                </div>
                :
                <div className="container botones" >
                    <button  onClick={()=>botonSeleccionado("Visualizar")} className="btn btn-primary">Visualizar</button>
                    <button  onClick={()=>botonSeleccionado("Modificar")} className="btn btn-primary">Modificar Rol</button>
                    <button  onClick={()=>botonSeleccionado("Eliminar")} className="btn btn-primary">Eliminar</button>
                </div>
            }
        </div>

    )
}