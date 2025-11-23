import { CreateCityDTO } from "../../dtos/City/create-city.dto";
import { CityEntity } from "../../entities/city.entity";
import { CityRepository } from "../../repositories/city.repository";

export class CreateCityUseCase {
    constructor(
        private readonly cityDatasource: CityRepository,
    ) {}

    async execute(dto: CreateCityDTO, userId: string): Promise<CityEntity> {
        const city = await this.cityDatasource.create(dto.name, userId);
        return city;
    }
}