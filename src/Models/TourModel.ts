import { Request } from "express"
export interface ITour{
    Id:string,
    Tourname:string,
    Tourimage:string,
    TDescription:string,
    TDestination:string,
    TPrice:string
    isDeleted:number
}
 interface addTour {
   Tourname: string;
   Tourimage: string;
   TDescription: string;
   TDestination: string;
   TPrice: string;
 }
 export interface TourRequest extends Request{
    body:addTour
 }