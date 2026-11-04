
import { Injectable } from '@angular/core';

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuariosKey = 'usuarios_registrados';
  private sesionKey = 'usuario_actual';

  registrar(usuario: Usuario): boolean {

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem(this.usuariosKey) || '[]'
    );

    const existe = usuarios.some(
      u => u.email.toLowerCase() === usuario.email.toLowerCase()
    );

    if (existe) {
      return false;
    }

    usuarios.push(usuario);

    localStorage.setItem(
      this.usuariosKey,
      JSON.stringify(usuarios)
    );

    return true;
  }

  iniciarSesion(email: string, password: string): boolean {

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem(this.usuariosKey) || '[]'
    );

    const usuario = usuarios.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
        && u.password === password
    );

    if (usuario) {
      sessionStorage.setItem(
        this.sesionKey,
        usuario.nombre
      );

      return true;
    }

    return false;
  }

  estaAutenticado(): boolean {
    return sessionStorage.getItem(this.sesionKey) !== null;
  }

  obtenerNombre(): string {
    return sessionStorage.getItem(this.sesionKey) || '';
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.sesionKey);
  }
}
