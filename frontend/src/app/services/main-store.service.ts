import { effect, Injectable, signal } from '@angular/core';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  constructor() { 
    // Esto asegura que el usuario esté disponible inmediatamente al cargar la aplicación
    // y no dependa de la carga de un componente específico.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.usuario.set(JSON.parse(storedUser));
    }
  }

  public usuario = signal<User | undefined>(undefined);

  private efecto = effect(() => {
    console.log("Usuario effecteado: ", this.usuario())
  })

  // Estado del token JWT
  public token = signal<string | null>(localStorage.getItem('authToken'));

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('authToken', token);
  }

  setUser(user: User) {
    this.usuario.set(user);
    const userString = JSON.stringify(user)
    localStorage.setItem("user", userString);
  }

  clearAuth() {
    this.usuario.set(undefined);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.token.set(null);
  }
}