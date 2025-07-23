import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const isLoggedIn = !!localStorage.getItem('token'); // Cambia esto según tu lógica de autenticación
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}