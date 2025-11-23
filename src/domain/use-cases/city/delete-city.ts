import { CityRepository } from "../../repositories/city.repository";

export class DeleteCityUseCase{
    constructor( private readonly cityRepository: CityRepository) {

    }
    async execute(city: string, userId: string){
        return this.cityRepository.deletByName(city, userId);
    }
}