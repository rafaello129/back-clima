import { PostgresDatabase } from "../../data/postgres";
import { User } from "../../data/postgres/entities";
import { City } from "../../data/postgres/entities/city.entity";
import { CityDatasource } from "../../domain/datasources/city.datasource";
import { CityEntity } from "../../domain/entities/city.entity";
import { CustomError } from "../../domain/errors";

export class CityDatasourceImpl implements CityDatasource{

    async findByUserId(userId: string): Promise< CityEntity[]> {
        const queryRunner = PostgresDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const user = await queryRunner.manager.findOne(User, { where: { uid: userId } });
            if (!user) throw CustomError.notFound('User not found');
            const cities = await queryRunner.manager
                .createQueryBuilder()
                .relation(User, "cities")
                .of(user)
                .loadMany<CityEntity>();
            return cities;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        } finally {
            await queryRunner.release();
        }
    }
    async create(city: string, userId: string): Promise<CityEntity> {
        const queryRunner = PostgresDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(User, { where: { uid: userId } });
            if (!user) throw CustomError.notFound('User not found');
    
            // Cambiado userId -> user
            const newCity = queryRunner.manager.create(City, { name: city, user: user });
            const savedCity = await queryRunner.manager.save(newCity);
    
            await queryRunner.commitTransaction();
            return {
                id: savedCity.id,
                name: savedCity.name,
                userId: user.uid,
            };
        } catch (error) {
            console.log("Transaction error:", error);
            await queryRunner.rollbackTransaction();
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        } finally {
            await queryRunner.release();
        }
    }

    async  deletByName(city: string, userId: string): Promise<void> {
        const queryRunner = PostgresDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(User, { where: { uid: userId } });
            if (!user) throw CustomError.notFound('User not found');

            const cityToDelete = await queryRunner.manager.findOne(City, { where: { name: city, user: { uid: userId } } });
            if (!cityToDelete) throw CustomError.notFound('City not found');

            await queryRunner.manager.remove(cityToDelete);

            await queryRunner.commitTransaction();
        } catch (error) {
            console.log("Transaction error:", error);
            await queryRunner.rollbackTransaction();
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        } finally {
            await queryRunner.release();
        }
    }
}