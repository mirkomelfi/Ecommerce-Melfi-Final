import { Router } from "express";
import { emptyCart, finalizarCompra, getCartById,getCarts, removeProductCart,addProductCart } from "../controllers/cart.js";
import { autenticateRolUsr } from "../controllers/products.js";

const routerCart = Router()

routerCart.get("/", getCarts)
routerCart.get("/:cid",getCartById)
routerCart.post("/add", autenticateRolUsr, addProductCart) // cambiar logica
routerCart.get("/:cid/purchase", finalizarCompra) // cambiar logica
routerCart.delete("/:cid/product/:pid",removeProductCart)// cambiar logica
routerCart.delete("/:cid",emptyCart)// cambiar logica

/*

no se si hacen falta xq generalmente esto va x body no x params y ya la cree en el user
routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)

*/


export default routerCart