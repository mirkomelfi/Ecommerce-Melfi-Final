import { addProductToCart,checkStock,deleteElementsCart,deleteProductCart,findCartById,findCarts } from "../services/CartServices.js"
import { createTicket } from "../services/TicketServices.js"
import { findUserById, findUsers } from "../services/UserServices.js"

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
        const {idCart,idProduct,quantity}= req.body
        const cart = await addProductToCart(idCart,idProduct,quantity)
        res.status(200).json({
            message: "Carrito actualizado",
        })

    } catch (error) {
        res.status(500).send(error)
    }

}

export const finalizarCompra = async (req, res) => {
    const {cid}=req.params 
    try {
        const [cartFinal,cartCancelado] = await checkStock(cid)

        if (cartFinal.products.length!==0){
            const users= await findUsers()
            const user=users.find(user=>user.idCart==cartFinal.id)
            const userEmail=user.email
    
            const ticket= await createTicket(cartFinal,userEmail)
    
            await deleteElementsCart(cid)

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

        const {cid,pid}= req.params
        const cart = await deleteProductCart(cid,pid)

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
        const {cid}= req.params
        const cart = await deleteElementsCart(cid)
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