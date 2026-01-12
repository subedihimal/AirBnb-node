import { CreationAttributes, Model, ModelStatic, WhereOptions } from 'sequelize';
import { NotFoundError } from '../utils/errors/app.error';

abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;

    }

    async findById(id: number): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if(!record){
            return null;
        }
        return record;
    }

    async findAll(): Promise<T[]> {
        const records = await this.model.findAll({});
        if(!records){
            return[];
        }
        return records;
    }
    async delete(whereOptions : WhereOptions<T>): Promise<void> {
        const record = await this.model.destroy({
            where: {
                ...whereOptions
            }
        });
        if(!record){
            throw new NotFoundError(`Record with ${JSON.stringify(whereOptions)} not found`)
        }
        return;
    }
    async create(data: CreationAttributes<T>): Promise<T> {
        const record = await this.model.create(data);
        return record;
    }
    async update(id: number, data: Partial<T>): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if(!record){
            throw new NotFoundError(`Record with ${id} not found`);
        }
        Object.assign(record, data);
        await record.save();
        return record;
    }

}

export default BaseRepository;