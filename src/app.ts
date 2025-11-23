import { envs } from "./config";
import { PostgresDatabase } from "./data/postgres";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

const serverInstance = new Server({
    routes: AppRoutes.routes 
});

// Conexión DB
(async () => {
    await PostgresDatabase.connect({
        host: envs.HOST_DB,
        port: envs.PORT_DB,
        username: envs.USERNAME_DB,
        password: envs.PASSWORD_DB ?? '',
        database: envs.DATABASE_DB,
    });
})();

export default serverInstance.app; // Exportar la instancia express