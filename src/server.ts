import express, {json} from 'express'
import tourRoute from './Routes/tourRoutes'
import userRoute from './Routes/userRoutes'
import hotelRoute from './Routes/hotelRoutes'
import bookingRoute from './Routes/bookingRoutes'
const app = express()
app.use(json())

app.use("/tours", tourRoute)
app.use("/users", userRoute)
app.use("/hotels", hotelRoute)
app.use("/booking", bookingRoute)
app.listen(4001, ()=>{
    console.log("Tour management system is running")
})
