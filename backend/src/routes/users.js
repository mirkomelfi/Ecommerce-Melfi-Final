import { Router } from 'express'
import { deleteInactiveUsers, getUsers } from "../controllers/user.js";
import { passportError } from "../middlewares/passportError.js";
import { roleValidation } from "../middlewares/autenticateRol.js";


const routerUsers = Router()

routerUsers.get('/', passportError("jwt"),roleValidation(["Admin"]), getUsers)
routerUsers.delete('/',passportError("jwt"),roleValidation(["Admin"]), deleteInactiveUsers)


export default routerUsers
