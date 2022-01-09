import express, { Application } from 'express';
import cors from 'cors';
import HTTP from 'http'
import authRouter from '../routes/authRoutes';
import { Server as ServerIO } from 'socket.io';
import { socketController } from '../sockets/controller';

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
    private server: HTTP.Server;
    private io: ServerIO;

    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        uploads: '/api/uploads'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.server = HTTP.createServer(this.app)
        this.io = new ServerIO(this.server);

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

    socket() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
        
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

export default Server;