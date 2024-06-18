import Joi from "joi";
 export const BookingSchema = Joi.object({
   userId: Joi.string().required(),
   tourId: Joi.string().required(),
   hotelId: Joi.string().required(),
   bstartdate: Joi.string().required(),
   benddate: Joi.string().required(),
   bookingdate: Joi.string().required(),
   bstatus: Joi.string().required(),
 });

  export const BookingSchema1 = Joi.object({
     userId: Joi.string().required(),
    tourId: Joi.string().required(),
    hotelId: Joi.string().required(),
    bstartdate: Joi.string().required(),
    benddate: Joi.string().required(),
    bookingdate: Joi.string().required(),
    bstatus: Joi.string().required(),
  });