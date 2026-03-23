import  RoomRepository  from "../repositories/room.repository";
import { GetAvailableRoomsDTO, UpdateBookingIdToRoomsDTO } from "../dto/room.dto";

const roomRepository = new RoomRepository();

export async function getAvailableRoomsService(getAvailaableRoomsDTO: GetAvailableRoomsDTO){
    const rooms = await roomRepository.findByRoomCategoryIDAndDateRange(
        getAvailaableRoomsDTO.roomCategoryId,
        new Date(getAvailaableRoomsDTO.checkInDate),
        new Date(getAvailaableRoomsDTO.checkOutDate)
    );
    return rooms;
}

export async function updateBookingIdToRoomsService(updateBookingIdToRoomsDTO: UpdateBookingIdToRoomsDTO){
    return await roomRepository.updateBookingIdToRooms(
        updateBookingIdToRoomsDTO.bookingId,
        updateBookingIdToRoomsDTO.roomIds
    );
}