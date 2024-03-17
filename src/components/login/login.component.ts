import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="container_login">
  <form [formGroup]="form" class="container_login formulario" (ngSubmit)="onSubmit()">
    <div class="container_login formulario--inline">
      <label>Email</label>
      <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && checkControlError['email'].errors }"/>
      @if (submitted && checkControlError['email'].errors) {
      <div class="invalid-feedback">
        @if (checkControlError['email'].errors['required']) {
        <div class="errores">Tienes que ingresar un email</div>
        } @if (checkControlError['email'].errors['email']) {
        <div  class="errores">Email invalido</div>
        }
      </div>
      }
    </div>

    <div class="container_login formulario--inline">
      <label>Password</label>
      <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && checkControlError['password'].errors }"/>
      @if (submitted && checkControlError['password'].errors) {
      <div class="invalid-feedback">
        @if (checkControlError['password'].errors['required']) {
        <div class="errores">Tienes que ingresar la contraseña</div>
        } @if (checkControlError['password'].errors['minlength']) {
        <div class="errores">La password tiene que tener más de 6 caracteres</div>
        } @if (checkControlError['password'].errors['maxlength']) {
        <div class="errores">La password es demasiado grande</div>
        }
      </div>
      }
    </div>
    <div class="container_login formulario--row">
      <input type="checkbox" formControlName="acceptTerms" class="form-check-input" [ngClass]="{ 'is-invalid': submitted && checkControlError['acceptTerms'].errors }"/>
      <label for="acceptTerms" class="form-check-label">Acepto los terminos</label>
      @if (submitted && checkControlError['acceptTerms'].errors) {
        <div class="errores">
          Tienes que aceptar los terminos antes de poder continuar
        </div>
      }
    </div>

    <div class="container_login formulario--row">
      <button type="submit" class="btn btn-primary">Ingresar</button>
      <button type="button" (click)="onReset()" class="btn btn-danger float-right">
        Cancelar
      </button>
    </div>
  </form>
</div>

  `,
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        acceptTerms: [false, Validators.requiredTrue],
      }
    );
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigateByUrl('/post-home');
    }
  }
  /**
   * Metodo que comprueba si un control tiene errores
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof LoginComponent
   */
  get checkControlError(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  /**
   * Metodo que hace un submit , este comprueba que se haga un login correcto y luego redirecciona
   *
   * @return {*}  {void}
   * @memberof LoginComponent
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const loginCorrecto = this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value);
    if (loginCorrecto) {
      this.router.navigateByUrl('/post-home');
    }
  }
  /**
   * Metodo que reinicia el formulario
   */
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
