import { Router} from "express";
import { addBooking, deletebooking, getAllBookings, getBooking, updateBooking } from "../Controllers/bookingController";

const bookingRoute= Router()
bookingRoute.post("", addBooking)
bookingRoute.get("/bookings", getAllBookings)
bookingRoute.get("/booking/:id", getBooking)
bookingRoute.patch("/:id", updateBooking)
bookingRoute.delete("/:id", deletebooking)

export default bookingRoute;