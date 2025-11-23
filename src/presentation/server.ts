import express, { Express, Router } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

interface Options {
    routes: Router;
}

export class Server {

    public readonly app: Express;

    constructor(options: Options) {
        const { routes } = options;
        this.app = express();

        // Middleware -- aquí debe estar todo fuera de start
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        this.app.use(morgan((tokens, req, res) => {
            return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms'
            ].join(' ');
        }));

        this.app.use(
            "/exports",
            express.static(path.join(__dirname, '../exports'))
        );

        // Endpoint de salud
        this.app.get('/health', (req, res) => {
            res.status(200).send('Healthy');
        });

        // Rutas
        this.app.use(routes);
        this.app.use(express.static(path.resolve(__dirname, './public')));

        // Manejo de errores
        this.app.use((err: any, _req: any, res: any, _next: any) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }
}