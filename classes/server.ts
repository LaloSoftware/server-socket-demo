import express from "express"
import {SERVER_PORT} from '../global/environment';
import socketIO from "socket.io";
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server{
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escicharSockets();
    }

    public static get instace() {
        return this._instance || (this._instance = new this());
    }

    private escicharSockets(){
        console.log("Escucahando conexiones");
        this.io.on("connection", cliente => {
            socket.conectarCliente(cliente)
            //asdasd
            socket.mensaje(cliente, this.io);
            //desconectar
            socket.deconectar(cliente);
            //loginWS
            socket.configUsuario(cliente, this.io);

        });
    }

    start(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Corriendo en puerto ${this.port}`);
        });
    }
}