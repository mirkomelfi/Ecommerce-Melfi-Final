import React from "react";
//import logo from "../../assets/logo1.jpg"
//import { CartWidget } from "../CartWidget/CartWidget";
import {Link} from "react-router-dom";
import "./Navbar.css"
import { CartWidget } from "../CartWidget/CartWidget";

const Navbar = () =>{
    return (
        <header>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/"><h1>Adiestramiento Canino Jirok</h1></Link>
            
            <nav>
                <Link to="/category/cursos">Cursos</Link>
                <Link to="/category/seminarios">Seminarios</Link>
                <Link to="/category/accesorios">Accesorios</Link> 
                <CartWidget/>
                
                
            </nav>
        </header>
    );
  }
  
  export default Navbar;
  