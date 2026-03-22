import { z } from "zod";

export const getAvailableRoomsSchema = z.object({
    roomCategoryId: z.number({message: "Room category id must be present"}),
    checkInDate: z.string({message: "Check in date must be present"}),
    checkOutDate: z.string({message: "Check out date must be present"}),
})