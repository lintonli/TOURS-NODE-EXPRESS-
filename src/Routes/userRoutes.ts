import {Router} from 'express'
import { deleteUser, loginUser, registerUser } from '../Controllers/userController'

const userRoute = Router()
userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)
userRoute.delete("/:id", deleteUser)
export default userRoute;