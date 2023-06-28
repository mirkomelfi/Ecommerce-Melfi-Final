import { Router } from "express";
import { emptyCart, finalizarCompra, getCartById,getCarts, removeProductCart } from "../controllers/cart.js";


const routerCart = Router()

routerCart.get("/", getCarts)
routerCart.get("/:cid",getCartById)
routerCart.get("/:cid/purchase", finalizarCompra) 
routerCart.delete("/:cid/product/:pid",removeProductCart)
routerCart.delete("/:cid",emptyCart)

/*

no se si hacen falta xq generalmente esto va x body no x params y ya la cree en el user
routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)

*/


export default routerCart