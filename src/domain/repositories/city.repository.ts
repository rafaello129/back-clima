import { CityEntity } from "../entities/city.entity";

export abstract class CityRepository {
    abstract findByUserId(userId: string): Promise<CityEntity[]>;
    abstract create(city: string, userId:string): Promise<CityEntity>;
    abstract deletByName(city: string, userId:string): Promise<void>;
}