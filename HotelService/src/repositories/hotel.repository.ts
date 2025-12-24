import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

//Creating Hotel
export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create(hotelData);

    logger.info(`Hotel Created: ${hotel.id}`);
    return hotel;
}

//Search Hotel By Id
export async function getHotelById(id:number){
    const hotel = await Hotel.findOne({
        where:{
            id:id,
            deletedAt: null,
        }
        
    });
    if(!hotel){
        logger.error(`Hotel Not Found ${id}`)
        throw new NotFoundError("Hotel Not Found");
    }
    logger.info(`Hotel Found for ${id}`);

    return hotel;
}

export async function getAllHotel() {
    const hotel = await Hotel.findAll({
        where: {
            deletedAt: null,
        }
    });
    if(!hotel){
        logger.error(`All Hotel Not Found`);
        throw new NotFoundError(`All Hotel Not Found`);
    }
    logger.info('All Hotels Were Found');
    return hotel;
    
}
export async function softDeleteHotel(id: number) {
    const hotel = await Hotel.findByPk(id);

    if(!hotel){
        logger.error(`Hotel not found ${id}`);
        throw new NotFoundError(`Hotel not found ${id}`);
    }
    hotel.deletedAt = new  Date();
    await hotel.save();
    logger.info(`Hotel soft Deleted ${hotel.id}`);
    return hotel;
}