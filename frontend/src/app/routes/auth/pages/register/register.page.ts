import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonButton, IonGrid, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserPost } from 'src/app/model/user';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonInput, IonGrid, IonButton, IonCol, IonRow, IonContent, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  name = '';
  lastname = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  role =''

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
  }

  async onRegister(): Promise<void> {

    if (!(this.password === this.confirmPassword)) {
      console.error('Las contraseñas no coinciden')
      this.router.navigate(['/register']);
    }
    try {
      const newUser: UserPost = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        role: 'user'
      };

      const response = await this.usuarioService.postUser(newUser);
      console.log('Usuario registrado:', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
