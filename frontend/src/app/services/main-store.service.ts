import { effect, Injectable, signal } from '@angular/core';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

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
    this.token.set(null);
  }


  constructor() { }
}