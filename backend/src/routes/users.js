import { Router } from 'express'
import { deleteInactiveUsers, getUsers } from "../controllers/user.js";

const routerUsers = Router()

routerUsers.get('/', getUsers)
routerUsers.delete('/', deleteInactiveUsers)


export default routerUsers