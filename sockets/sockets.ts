import { Socket } from "socket.io";
import socketIO from 'socket.io'
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

const usuariosConectados: UsuariosLista = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario: Usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const deconectar = (cliente: Socket)=>{
    cliente.on('disconnect', ()=>{
        console.log(cliente.id);
        let id = cliente.id
        usuariosConectados.borrarUsuario(id);
        console.log(`Cliente con id: '${id}' desconectado`);
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload: {de: string, mensaje: string})=>{
        console.log(`Mensaje recibido de '${payload.de}' con el mensaje '${payload.mensaje}'`);
        io.emit('mensaje-nuevo', payload);
    });
}

export const configUsuario = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        console.log(usuariosConectados);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
}