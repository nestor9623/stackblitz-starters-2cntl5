import { FormGroup, FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [LoginComponent, FormsModule]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("debe crear un formulario de inicio valido", () =>{
    expect(component.form).toBeTruthy();
    expect(component.form instanceof FormGroup).toBeTruthy();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it("Debe marcar los campos invalidos cuando esten vacios", () => {
    const emailControl = component.form.get('email');
    const passwordControl = component.form.get('password');
    expect(emailControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
  });

  it("Debe marcar el campo email como valido con una dirección de correo electronica valida", () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue("test@example.com");
    expect(emailControl?.valid).toBeTruthy();
  });
  it("Debe marcar el campo password como valido con una password valida con al menos 6 caracteres", () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue("administrador1234");
    expect(passwordControl?.valid).toBeTruthy();
  });

  // it("Debe llamar la funcion submit de login" , () => {
  //   spyOn(component, "onSubmit");
  //   const emailControl = component.form.get('email');
  //   const passwordControl = component.form.get('password');
  //   emailControl?.setValue("test@example.com");
  //   passwordControl?.setValue("administrador1234");
  //   const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
  //   formElement.dispatchEvent(new Event('submit'));
  //   fixture.detectChanges();
  //   expect(component.onSubmit()).toHaveBeenCalled();
  // })
});
