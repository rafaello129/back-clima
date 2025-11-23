import { Router } from "express";
import { CityDatasourceImpl } from "../../infrastructure/datasources/city.datasource.impl";
import { CityRepositoryImpl } from "../../infrastructure/repositories/city.repository.impl";
import { CityController } from "./controller";
import { AuthMiddleware } from "../middlewares";

export class CityRoutes {
    static get routes(): Router {
        const router = Router();
        const cityDatasource = new CityDatasourceImpl();
        const cityRepository = new CityRepositoryImpl(cityDatasource);
        const controller = new CityController(cityRepository);

        // All routes below require authentication
        router.use(AuthMiddleware.validateJwt);

        // Profile routes (for the authenticated user)
        router.get('/', controller.getCitiesByUser);
        router.post('/', controller.createCity);
        router.delete('/:name', controller.deleteCity);
        return router;
    }
}