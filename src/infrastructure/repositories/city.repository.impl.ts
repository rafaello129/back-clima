import { CityDatasource } from "../../domain/datasources/city.datasource";
import { CityEntity } from "../../domain/entities/city.entity";
import { CityRepository } from "../../domain/repositories/city.repository";

export class CityRepositoryImpl implements CityRepository {
    constructor(private readonly cityDatasource: CityDatasource) {}

    async findByUserId(userId: string): Promise<CityEntity[]> {
        return this.cityDatasource.findByUserId(userId);
    }
    async create(city: string, userId: string): Promise<CityEntity> {
        return this.cityDatasource.create(city, userId);
    }

    async deletByName(city: string, userId: string): Promise<void> {
        return this.cityDatasource.deletByName(city, userId);
    }
}