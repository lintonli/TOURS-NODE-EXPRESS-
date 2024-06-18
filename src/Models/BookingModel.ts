import { Request } from "express";
export interface IBooking {
  Id: string;
  userId: string;
  tourId: string;
  hotelId: string;
  bstartdate: string;
  benddate: string;
  bookingdate: string;
  bstatus: string;
  isEmailSent: string;
  isDeleted: number;
}
interface addBooking {
  userId: string;
  tourId: string;
  hotelId: string;
  bstartdate: string;
  benddate: string;
  bookingdate: string;
  bstatus: string;
}
export interface BookingRequest extends Request {
  body: addBooking;
}

