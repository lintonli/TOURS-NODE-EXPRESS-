import { Request } from "express";
export interface IHotel {
  ID: string;
  Hotelname: string;
  Hotelimage: string;
  Hlocation: string;
  isDeleted: number;
  TourId: string;
}
interface addHotel {
  Hotelname: string;
  Hotelimage: string;
  Hlocation: string;
  TourId: string;
}

export interface HotelRequest extends Request {
  body: addHotel;
}
