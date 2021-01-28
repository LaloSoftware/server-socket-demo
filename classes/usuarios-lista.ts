import { Usuario } from "./usuario";

export class UsuariosLista{
    private lista: Usuario[];
    constructor(){
        this.lista = [];
    }

    agregarUsuario(usuario: Usuario){
        this.lista.push(usuario);
    }

    public actualizarNombre(id: string, nombre: string){
        let userRef = this.lista.find(usuario => usuario.id == id);
        if(userRef) userRef.nombre = nombre;
    }

    public obtenerLista(){
        return this.lista.filter(usuario => usuario.nombre !== '');
    }

    public obtenerUsuario(id: string){
        return this.lista.find( usuario => usuario.id == id);
    }

    public obtenerSala(sala: string){
        return this.lista.filter( usuario => usuario.sala == sala);
    }

    public borrarUsuario(id: string){
        this.lista = this.lista.filter(usuario => usuario.id !== id);
    }
}