import { Router} from "express";
import { addHotel, deleteHotel, getHotels, updateHotel } from "../Controllers/hotelController";
import { verifyTokens } from "../middlewares";
const hotelRoute = Router()

hotelRoute.get("",getHotels)
hotelRoute.get("/hotel/:id", verifyTokens,getHotels)
hotelRoute.get("/tour/:id", verifyTokens, getHotels);
hotelRoute.post("", verifyTokens, addHotel);
hotelRoute.patch("/:id", verifyTokens, updateHotel);
hotelRoute.delete("/:id", verifyTokens, deleteHotel);
export default hotelRoute;