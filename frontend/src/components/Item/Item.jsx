import "./Item.css";
import {Link} from "react-router-dom";

const Item =({producto})=>{
    console.log("item",producto._id)
    return(
        <>
            <div className="tarjetaProducto">
                <h2>{producto.title}</h2>
                <h2>{producto.description}</h2>
                <h3>{producto.category}</h3>
                <h3>${producto.price}</h3>
                <Link to={`producto/${producto._id}`}>Ver más</Link> 
            </div>
        </>
    )
}

export {Item}