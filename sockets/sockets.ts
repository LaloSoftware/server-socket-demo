import { Socket } from "socket.io";

export const deconectar = (cliente: Socket)=>{
    cliente.on('disconnect', ()=>{
        console.log("Cliente desconectado");
    })
}