import express, { Application } from 'express';
import cors from 'cors';
import authRouter from '../routes/authRoutes';

interface IApp {
    // app: Application;
    // port: string;
    middlewares(): void;
    routes(): void;
    listen(): void;
    socket(): void;
}


class Server implements IApp {
    private app: Application;
    private port: string;

    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        uploads: '/api/uploads'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.listen();
        this.socket();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());

    }

    routes() {
        this.app.use(this.apiPaths.auth, authRouter);
    }

    socket() { }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

export default Server;