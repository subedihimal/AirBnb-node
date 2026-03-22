import  RoomRepository  from "../repositories/room.repository";
import { GetAvailableRoomsDTO } from "../dto/room.dto";

const roomRepository = new RoomRepository();

export async function getAvailableRoomsService(getAvailaableRoomsDTO: GetAvailableRoomsDTO){
    const rooms = await roomRepository.findByRoomCategoryIDAndDateRange(
        getAvailaableRoomsDTO.roomCategoryId,
        new Date(getAvailaableRoomsDTO.checkInDate),
        new Date(getAvailaableRoomsDTO.checkOutDate)
    );
    return rooms;
}