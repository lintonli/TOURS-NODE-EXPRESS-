import {Router} from 'express'
import { loginUser, registerUser } from '../Controllers/userController'

const userRoute = Router()
userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)
export default userRoute;