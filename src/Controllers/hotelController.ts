import mssql from "mssql";
import { Request, Response, RequestHandler, response } from "express";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../config";
import { DbHelper } from "../Helpers/databaseHelper";
import { HotelRequest, IHotel } from "../Models/HotelModel";

const databaseInstance = new DbHelper();

export const addHotel = async (req: HotelRequest, res: Response) => {
  try {
    const id = uid();
    const { Hotelname, Hotelimage, Hlocation, TourId } = req.body;
    await databaseInstance.exec("addHotel", {
      ID: id,
      NAME: Hotelname,
      IMAGE: Hotelimage,
      Location: Hlocation,
      TOURID: TourId,
    });
    return res.status(201).json({ message: "Hotel created successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getHotels: RequestHandler = async (req, res) => {
  try {
    const hotels = (await databaseInstance.exec("getHotels",{}))
      .recordset as IHotel[];
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getHotel = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const hotel = (
      await databaseInstance.exec("getHotel", { ID: req.params.id })
    ).recordset[0] as IHotel;
    if (hotel && hotel.ID) {
      return res.status(200).json(hotel);
    }
    return res.status(404).json({ message: "Hotel not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getHotelbyTour = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const hotels = (
      await databaseInstance.exec("getHotelbyTour", { TourId: req.params.id })
    ).recordset[0] as IHotel;
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateHotel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const hotel = (
      await databaseInstance.exec("getHotel", { ID: req.params.id })
    ).recordset[0] as IHotel;
    if (hotel && hotel.ID) {
      const { Hotelname, Hotelimage, Hlocation, TourId } = req.body;
      await databaseInstance.exec("updateHotel", {
        ID: req.params.id,
        NAME: Hotelname,
        IMAGE: Hotelimage,
        LOCATION: Hlocation,
        TOURID: TourId,
      });
      return res.status(200).json({ message: "Hotel updated successfully" });
    }
    return res.status(404).json({message:"Hotel not found"})
  } catch (error) {
    return res.status(500).json(error)
  }
};

export const deleteHotel= async(req:Request, res:Response)=>{
    try {
        const hotel = (
          await databaseInstance.exec("getHotel", { ID: req.params.id })
        ).recordset[0] as IHotel;
        if (hotel && hotel.ID) {
          await databaseInstance.exec("deleteHotel", { ID: req.params.id });
          return res
            .status(200)
            .json({ message: "Hotel deleted successfully" });
        }
        return res.status(404).json({ message: "Hotel not found" });
    } catch (error) {
        return res.status(500).json(error)
    }
}
