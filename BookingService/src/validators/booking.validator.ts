import {z} from "zod";

export const createBookingSchema = z.object({
    userId: z.number({ message: "User ID  must be present"}),
    hotelId: z.number({message: "Hotel id must be present"}),
    totalGuests: z.number({message: "Total guests id must be present"}).min(1,{message: "Total guest should be alteast 1"}),
    bookingAmount: z.number({message: "Booking id must be present"}).min(1,{message: "Booking Amount must be greater then 1"}),
})