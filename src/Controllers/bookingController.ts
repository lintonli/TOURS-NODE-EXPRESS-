import { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import mssql from "mssql";
import path from "path";
import { DbHelper } from "../Helpers/databaseHelper";
import { BookingSchema, BookingSchema1 } from "../Helpers/booking";
import { BookingRequest, IBooking } from "../Models/BookingModel";
import { v4 as uid } from "uuid";

const databaseInstance = new DbHelper();

export const addBooking = async (req: BookingRequest, res: Response) => {
  try {
    const id = uid();
    const { error } = BookingSchema1.validate(req.body);
  
    if (error) {
      return res.status(500).json("Booking inputs required" + error);
    }

    const {userId,tourId, hotelId, bstartdate, benddate, bookingdate,bstatus } =
      req.body;
    await databaseInstance.exec("addBooking", {
      ID: id,
      USERID: userId,
      HOTELID: hotelId,
      TOURID: tourId,
      BSTART: bstartdate,
      BEND: benddate,
      BDATE: bookingdate,
      BSTATUS:bstatus
    });
    return res.status(200).json({ message: "Booking added successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getAllBookings: RequestHandler = async (req, res) => {
  try {
    const bookings = (await databaseInstance.exec("getBookings", {}))
      .recordset as IBooking[];
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getBooking = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const booking = (
      await databaseInstance.exec("getBooking", { ID: req.params.id })
    ).recordset[0] as IBooking;
    if (booking && booking.Id) {
      return res.status(200).json(booking);
    }
    return res.status(404).json({ message: "Booking not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateBooking = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { error } = BookingSchema.validate(req.body);
    if (error) {
      return res.status(500).json("Booking inputs required" + error);
    }
    const booking = (
      await databaseInstance.exec("getBooking", { ID: req.params.id })
    ).recordset[0] as IBooking;
    if (booking && booking.Id) {
      const {userId,tourId, hotelId, bstartdate, benddate, bookingdate,bstatus } =
        req.body;
      await databaseInstance.exec("updateBooking", {
        ID: req.params.id,
        USERID: userId,
        HOTELID: hotelId,
        TOURID: tourId,
        BSTART: bstartdate,
        BEND: benddate,
        BDATE: bookingdate,
        BSTATUS:bstatus
      });
      return res.status(200).json({message:"Booking updated successfully"})
    }
    return res.status(404).json({message:"Booking not found"})
  } catch (error) {
    return res.status(500).json(error)
  }
};
export const deletebooking = async (req:Request<{id:string}>, res:Response)=>{
    try {
        const booking = (
      await databaseInstance.exec("getBooking", { ID: req.params.id })
    ).recordset[0] as IBooking;
    if (booking && booking.Id){
        await databaseInstance.exec('deleteBooking',{ID:req.params.id})
        return res.status(200).json({message:"Booking deleted successfully"})
    }
    return res.status(404).json({message:"Booking not found"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
