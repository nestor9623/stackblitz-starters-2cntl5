import { AuthService } from './../../services/auth.service';
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-home',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="fondo_principal">          
        <div class="fondo" id="fondo">
            <div class="messages">
                <label class="messages--big">{{titlePage}}</label>
                <div class="form-group">
                    <button type="submit" (click)="logout()" class="btn btn-danger">Cerrar Sesión</button>
                </div>
            </div>
        </div>
  `
})

export class PostHomeComponent {
    titlePage = 'Logueado correctamente';

    constructor(private authService: AuthService, private router: Router) { }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('');
    }
}