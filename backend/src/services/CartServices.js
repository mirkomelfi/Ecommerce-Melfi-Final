import cartModel from "../models/MongoDB/cartModel.js";
import productModel from "../models/MongoDB/productModel.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { generateAddProductErrorInfo } from "./errors/info.js";



export const findCarts = async () => {
    try {
        const carts = await cartModel.find()
        return carts
    } catch (error) {
        throw new Error(error)
    }
}

export const findCartById = async (id) => {
    try {
        const cart = await cartModel.findById(id)  //.populate("products.Products") checkear el populate
        return cart
    } catch (error) {
        throw new Error(error)
    }
}

export const checkStock = async (idCart) => {
    try {
        const cart = await cartModel.findById(idCart) // me traigo el cart 
        const productsCart=cart.products // me traigo los productos del cart
        const productsBDD= await productModel.find() // me traigo los productos de la BDD para hacer la comparacion luego del stock
        const cartNoStock= []
        const productosBDDupdated= []
        const finalCart={id:idCart,products:[]}
 
        productsCart.forEach(productCart=>{
            const prod= productsBDD.find(product=>product.id==productCart.productId)

            if(prod){
                if(prod.stock>=productCart.quantity){
                    const newQuantity=prod.stock-productCart.quantity
                    const subtotal= prod.price*productCart.quantity
                    productCart={...productCart._doc,subtotal:subtotal}
                    prod.stock=newQuantity
                    productCart.subtotal=subtotal
                    productosBDDupdated.push(prod) // para actualizar el stock en la BDD de los prod comprados
                    finalCart.products.push(productCart) // cart con productos finales
                }
                else{
                    cartNoStock.push(productCart) // array con productos excluidos
                }
            }

        })
        //actualizar producto en BDD
        for (let i=0;i<productosBDDupdated.length;i++){
            await productModel.findByIdAndUpdate(productosBDDupdated[i].id,productosBDDupdated[i])
        }

        return [finalCart,cartNoStock] // devuelve los productos que sí se pudieron comprar

    } catch (error) {
        throw new Error(error)
    }
}

export const addProductToCart = async (idCart,idProduct,quantity) => { 
// falta: si no ingresa alguno de los 3 parametros ERROR!!
    try {
        const cart= await cartModel.findById(idCart)
        const arrayProductos= cart.products

        if (arrayProductos.some(producto=>producto.productId==idProduct)){
            const productWanted= arrayProductos.find(prod=>prod.productId==idProduct)
            productWanted.quantity=productWanted.quantity+parseInt(quantity)
        }else{
            arrayProductos.push({productId:idProduct,quantity:quantity}) // checkear
        }

        cart.products=arrayProductos
        const cartUpdated= await cartModel.findByIdAndUpdate(idCart,cart)
        return cartUpdated
    } catch (error) {
        throw new Error(error)
    }
}
export const addProductToCartTESTSer = async (idCart,idProduct) => { 
    // falta: si ya habia ingresado aqui y vuelve a tocar este boton!!
    try {
        const cart= await cartModel.findById(idCart)
        const arrayProductos= cart.products
        if (arrayProductos.some(producto=>producto.productId==idProduct)){
            return -1
        }else{
            arrayProductos.push({productId:idProduct,quantity:1})     
            cart.products=arrayProductos
            const cartUpdated= await cartModel.findByIdAndUpdate(idCart,cart)
            return cartUpdated
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const updateProductsCartSER = async (idCart, newCart) => { 
    // falta: si ya habia ingresado aqui y vuelve a tocar este boton!!
    try {
        const cart= await cartModel.findById(idCart)
        const arrayProductos= cart.products
        cart.products=newCart
        const cartUpdated= await cartModel.findByIdAndUpdate(idCart,cart)
        return cartUpdated
    } catch (error) {
        throw new Error(error)
    }
}
    

export const deleteProductCart = async  (idCart,idProduct) => {
    
    try{
        const cart= await cartModel.findById(idCart)

        if (cart){
            const arrayProductos= cart.products
            if (arrayProductos.some(producto=>producto.productId==idProduct)){
                const arrayUpdated=arrayProductos.filter(producto=>producto.productId!=idProduct)
                cart.products=arrayUpdated
                const cartUpdated= await cartModel.findByIdAndUpdate(idCart,cart)
                return cartUpdated
            }
        }

        return -1
    }catch (error){
        throw new Error(error)
    }
}

/*
export const addProductsCart = async (idCart,newArrayProducts) => {
    const cart= await cartModel.findById(idCart)
    if(cart){
        cart.products=newArrayProducts
        return cart
    }
    return -1

}


export const updateProductCart  = async (idCart,idProduct,newQuantity)=> {
    const cart= await cartModel.findById(idCart)
    const arrayProductos= cart.products
    if (arrayProductos.some(producto=>producto.productId==idProduct)){
        const productWanted= arrayProductos.find(prod=>prod.productId===idProduct)
        productWanted.quantity=newQuantity
        cart.products=arrayProductos
        return cart
    }
    return -1
}
*/
export const deleteElementsCart = async (idCart)=> {
    try {
        const cart= await cartModel.findByIdAndUpdate(idCart,{products:[]})
        if (cart){
            return cart
        }
        return -1
    } catch (error) {
        throw new Error(error)
    }
    
}

export const createCart = async (cart) => { // implementar en el registro del usuario??
    //Errores de datos a enviar a mi BDD
    try {
        const newCart = await cartModel(cart)
        await newCart.save()
        return newCart
    } catch (error) {
        throw new Error(error)
    }
}

