import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: createHotelDTO){
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number){
    const hotel = await hotelRepository.findById(id);
    return hotel;
}

export async function getAllHotelService(){
    const hotel = await hotelRepository.findAll();
    return hotel;
}

export async function softDeleteHotelService(id :number) {
    const hotel = await hotelRepository.softDelete(id);
    return hotel;
    
}