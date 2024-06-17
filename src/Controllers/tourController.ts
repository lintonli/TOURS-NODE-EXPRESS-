import { Request, Response, RequestHandler } from "express";
import { v4 as uid } from "uuid";
import { DbHelper } from "../Helpers/databaseHelper";
import { ITour, TourRequest } from "../Models/TourModel";
import mssql from "mssql";
import { sqlConfig } from "../config";

const databaseInstance = new DbHelper();

export const addTour = async (req: TourRequest, res: Response) => {
  try {
    const id = uid();
    const { Tourname, Tourimage, TDescription, TDestination, TPrice } =
      req.body;
    await databaseInstance.exec("addTour", {
      ID: id,
      NAME:Tourname,
      IMAGE:Tourimage,
      DESCRIPTION:TDescription,
      DESTINATION:TDestination,
      PRICE:TPrice
    });
    // const pool = await mssql.connect(sqlConfig);
    // await pool
    //   .request()
    //   .input("ID", id)
    //   .input("NAME", Tourname)
    //   .input("IMAGE", Tourimage)
    //   .input("DESTINATION", TDestination)
    //   .input("DESCRIPTION", TDescription)
    //   .input("PRICE", TPrice)
    //   .execute("addTour");
    return res.status(201).json({ message: "Tour created successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getTours: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;
  try {
    const tours = (
      await databaseInstance.exec("getProducts", { Offset: offset, Limit: limit })
    ).recordset as ITour[];
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getTour = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const tour = (await databaseInstance.exec("getTour", { Id: req.params.id }))
      .recordset[0] as ITour;
    if (tour && tour.Id) {
      return res.status(200).json(tour);
    }
    return res.status(404).json({ message: "Tour not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateTour = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const tour = (await databaseInstance.exec("getTour", { Id: req.params.id }))
      .recordset[0] as ITour;
    if (tour && tour.Id) {
      const { Tourname, Tourimage, TDescription, TDestination, TPrice } =
        req.body;
      await databaseInstance.exec("updateTour", {
        Id: req.params.id,
        NAME: Tourname,
        IMAGE: Tourimage,
        DESCRIPTION: TDescription,
        DESTINATION: TDestination,
        PRICE: TPrice
      });
      return res.status(200).json({ message: "Tour updated successfully" });
    }
    return res.status(404).json({ message: "Tour not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deleteTour = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const tour = (await databaseInstance.exec("getTour", { Id: req.params.id }))
      .recordset[0] as ITour;
    if (tour && tour.Id) {
      await databaseInstance.exec("deleteTour", { Id: req.params.id });
      return res.status(200).json({ message: "Tour deleted successfully" });
    }
    return res.status(404).json({ message: "Tour not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
