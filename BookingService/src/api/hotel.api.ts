import axios from "axios";
import { serverConfig } from "../config";

export const getAvailableRooms = async (roomCategoryId: number, checkInDate: string, checkOutDate: string) => {
    console.log("Fetching available rooms for category: ", roomCategoryId, " checkInDate: ", checkInDate, " checkOutDate: ", checkOutDate);

    const response = await axios.get(`${serverConfig.HOTEL_SERVICE_URL}/rooms/available`, {
        params: {
            roomCategoryId,
            checkInDate,
            checkOutDate
        }
    });
    console.log("Available rooms response: ", response.data);
    return response.data;
}

export const updateBookingIdToRooms = async (bookingId: number, roomIds: number[]) => {
    try {
        const response = await axios.put(`${serverConfig.HOTEL_SERVICE_URL}/rooms/update-booking-id`, {
            bookingId,
            roomIds
        });
        return response.data;
    } catch (err: any) {
        console.error("Error updating booking id to rooms: ", err);
        throw new Error("Error in the service layer while updating booking id to rooms: " + err.message);
    }
}