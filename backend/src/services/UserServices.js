import userModel from "../models/MongoDB/userModel.js";
import jwt from "jsonwebtoken";

export const findUsers = async () => {

    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserById = async (id) => {
    try {
        const user = await userModel.findById(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: email })
        return user
    } catch (error) {
        throw new Error(error)
    }
}


export const createUser = async (user) => {
    //Errores de datos a enviar a mi BDD
    try {
        const newUser = await userModel(user)
        await newUser.save()
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}


export const modifyUser = async (id, password) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, {password})
        return user

    } catch (error) {
        throw new Error(error)
    }

}

export const modifyConnection = async (id, connection) => {
    try {

        const user = await userModel.findByIdAndUpdate(id, {last_connection:connection})
        return user

    } catch (error) {
        throw new Error(error)
    }

}

export const deleteUser = async (id) => {
    try {
        const user = await userModel.findByIdAndDelete(id)
        return user

    } catch (error) {
        throw new Error(error)
    }

}

export const isTokenExpired = (passwordData) => {
    try {
        const elapsedTime = Date.now()-passwordData.timeStamp
        const expirationTime= 60*60*1000
        return elapsedTime>=expirationTime
    } catch (error) {
        throw new Error(error)
    }
}


export const currentUser = async (req) => {
    try {
        const cookie = req.cookies['jwt']
        const user = jwt.verify(cookie,process.env.JWT_SECRET);
        if (user){
            return await userModel.findById(user.user.id)
        }else{
            return -1
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteUsers = async (users) => { 
    try {
        const expirationTime= 172800000// 2 dias
        const deletedUsers=[]
        
        users.forEach(user=>{
            const elapsedTime = Date.now()-user.last_connection.now()
            if (user.rol!="Admin"||user.rol!="admin"){
                if (elapsedTime>=expirationTime){
                    deletedUsers.push(user)
                }
            }
        })

        for (const user of deletedUsers) {
            await deleteUser(user.id)
        }
        
        return deletedUsers        

    } catch (error) {
        throw new Error(error)
    }
}