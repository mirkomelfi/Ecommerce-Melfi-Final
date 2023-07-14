import { Router } from "express";
import { emptyCart, finalizarCompra, getCartById,getCarts, removeProductCart,addProductCart, addProductCartTESTCont, updateProductsCart } from "../controllers/cart.js";
import { autenticateRolUsr } from "../controllers/products.js";

const routerCart = Router()

routerCart.get("/", getCarts)
routerCart.get("/:cid",getCartById)




routerCart.post("/product/:pid", autenticateRolUsr, addProductCartTESTCont) // solo agrega el primer elemento. luego ya no se puede utilizar esta ruta
routerCart.put("/product/:pid", autenticateRolUsr, addProductCart) // a la cantidad actual en el carrito, le suma esta. no la reemplaza
routerCart.put("/", autenticateRolUsr, updateProductsCart) // reemplaza todas las cantidades de los productos ingresados por las nuevas
routerCart.post("/", finalizarCompra)


routerCart.post("/add", autenticateRolUsr, addProductCart) // cambiar logica
routerCart.get("/:cid/purchase", finalizarCompra) // cambiar logica

routerCart.delete("/product/:pid",removeProductCart)
routerCart.delete("/",emptyCart)

/*

no se si hacen falta xq generalmente esto va x body no x params y ya la cree en el user
routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)

*/


export default routerCart