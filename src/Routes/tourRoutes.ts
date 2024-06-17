import { Router } from "express";
import { addTour, deleteTour, getTour, getTours, updateTour } from "../Controllers/tourController";
import { verifyTokens } from "../middlewares";
const tourRoute = Router()
tourRoute.get("", getTours)
tourRoute.get("/:id",verifyTokens, getTour)
tourRoute.post("",verifyTokens, addTour)
tourRoute.patch("/:id",verifyTokens, updateTour)
tourRoute.delete("/:id",verifyTokens, deleteTour)

export default tourRoute;