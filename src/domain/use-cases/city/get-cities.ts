import { CityRepository } from "../../repositories/city.repository";

export class GetCitiesByUser{
    constructor(private readonly cityRepository : CityRepository){

    }
    async execute(userId: string){
        return this.cityRepository.findByUserId(userId);
    }
}