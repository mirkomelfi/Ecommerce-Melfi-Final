import { addProductToCart,checkStock,deleteElementsCart,deleteProductCart,findCartById,findCarts,addProductToCartTESTSer, updateProductsCartSER } from "../services/CartServices.js"
import { createTicket } from "../services/TicketServices.js"
import { currentUser, findUserById, findUsers } from "../services/UserServices.js"


export const getCarts = async (req, res) => {
    try {
        
        const carts = await findCarts()
        req.logger.debug("Encuentra los carts OK")
        res.status(200).send(carts)

    } catch (error) {
        req.logger.fatal("No encuentra los carts")
        res.status(500).send(error)
    }

}

export const getCartById = async (req, res) => {
    const {cid}=req.params
    try {
        const cart = await findCartById(cid)
        res.status(200).send(cart)

    } catch (error) {
        res.status(500).send(error)
    }

}


export const addProductCart = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const user = await currentUser(req)

        const {pid}= req.params
        const {quantity}= req.body
        const cart = await addProductToCart(user.idCart,pid,quantity)
        res.status(200).json({
            message: "Carrito actualizado",
        })

    } catch (error) {
        res.status(500).send(error)
    }

}

export const addProductCartTESTCont = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const user = await currentUser(req)

        const {pid}= req.params
        const cart = await addProductToCartTESTSer(user.idCart,pid)
        if (cart==-1){
            res.status(400).json({
                message: "El producto ya fue agregado al menos una vez al carrito. Si desea agregar mas cantidad, seleccione la cantidad y el boton actualizar",
            })
        }else{
            res.status(200).json({
                message: "Producto agregado al carrito",
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

export const updateProductsCart = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const user = await currentUser(req)
        const products=req.body
        const cart = await updateProductsCartSER(user.idCart,products)
        if (cart==-1){
            res.status(400).json({
                message: " -1",
            })
        }else{
            res.status(200).json({
                message: "Carrito actualizado",
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}



export const finalizarCompra = async (req, res) => {
    const user = await currentUser(req)
    try {
        const [cartFinal,cartCancelado] = await checkStock(user.idCart)

        if (cartFinal.products.length!==0){

            const ticket= await createTicket(cartFinal,user.email)


            await deleteElementsCart(user.idCart)

            if (cartCancelado.length!==0){
                res.status(200).json({
                    message: "Carrito comprado, pero algunos productos no contaban con stock",
                    ticket_generado:ticket,
                    cart_comprado: cartFinal.products,
                    cart_sin_stock:cartCancelado
                })
            }else{
                res.status(200).json({
                    message: "Carrito comprado",
                    ticket_generado:ticket,
                    cart_comprado: cartFinal.products
                })
            }
        }else{
            res.status(200).json({
                message: "No se pudo realizar la compra, chequee si los productos agregados cuentan con stock suficiente",
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}


export const removeProductCart = async (req, res) => {
    try {
        const user = await currentUser(req)
        const {pid}= req.params
        const cart = await deleteProductCart(user.idCart,pid)

        if (cart){
            res.status(200).json({
                message: "Producto eliminado del carrito",
            })
        }else{
            res.status(400).json({
                message: "No se pudo eliminar del carrito",
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}


export const emptyCart = async (req, res) => {
    try {
        const user = await currentUser(req)
        const cart = await deleteElementsCart(user.idCart)
        if (cart){
            res.status(200).json({
                message: "Carrito vaciado correctamente",
            })
        }else{
            res.status(400).json({
                message: "No se pudo vaciar el carrito",
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }

}