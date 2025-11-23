import { Request, Response } from "express";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors";
import { CityRepository } from "../../domain/repositories/city.repository";
import { GetCitiesByUser } from "../../domain/use-cases/city/get-cities";

export class CityController {
    constructor (private readonly cityRepository: CityRepository ) {}
    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  
   // GET /api/cities/
   getCitiesByUser = (req: Request, res: Response) => {
    const user: UserEntity = req.body.user;
    new GetCitiesByUser(this.cityRepository)
        .execute(user.uid)
        .then(cities => {
            res.json(cities);
        })
        .catch(error => this.handleError(error, res));
}

    createCity = (req: Request, res: Response) => {
        const user: UserEntity = req.body.user;
        const { name } = req.body;
        this.cityRepository.create(name, user.uid)
            .then(city => {
                res.status(201).json(city);
            })
            .catch(error => {
                console.log(error);
                this.handleError(error, res)});
    }

    deleteCity = (req: Request, res: Response) => {
        const user: UserEntity = req.body.user;
        const { name } = req.params;
        console.log(`Deleting city: ${name} for user: ${user.uid}`);
        this.cityRepository.deletByName(name, user.uid)
            .then(() => {
                res.status(204).send();
            })
            .catch(error => this.handleError(error, res));
    }

}