import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { image } from '../../shared/images/fondo.const';

@Component({
  selector: 'app-post-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fondo_principal">
        <div class="fondo" id="fondo" [ngStyle]="stylesObj">
          <img [src]="imageSource" alt="Image Source"  style="width: 100%;  height: auto; max-height: 99%;"/>
            <div class="messages">
                <label class="messages--big">{{titlePage}}</label>
                <div class="form-group">
                    <button type="submit" (click)="logout()" class="btn btn-danger">Cerrar Sesión</button>
                </div>
            </div>
        </div>
  `,
})
export class PostHomeComponent {
  imageSource: any;
  titlePage = 'Logueado correctamente';
  //TODO:setear el fondo mediante la url en este objeto de propiedades
  stylesObj = {
    'background-image': '',
    'background-size': 'cover',
    position: 'relative',
    height: '100%',
    width: '100%',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.getImagenByUrl();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  getImagenByUrl() {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${image}`
    );
    this.stylesObj = {
      ...this.stylesObj,
      'background-image': 'url(' + this.imageSource + ')',
    };
  }
}
