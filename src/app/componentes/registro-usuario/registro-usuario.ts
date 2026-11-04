
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion';


@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-usuario.html',
  styleUrls: ['./registro-usuario.css']
})
export class RegistroUsuarioComponent {

  registroForm: FormGroup;
  mensajeExito: string = '';
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AutenticacionService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  

onSubmit(): void {

  if (this.registroForm.invalid) {
    this.registroForm.markAllAsTouched();
    return;
  }

  const { nombre, email, password } = this.registroForm.value;

  // Guardar usuario registrado
  const registrado = this.auth.registrar({
    nombre,
    email,
    password
  });

  if (!registrado) {
    this.mensajeExito = 'Este correo ya está registrado.';
    return;
  }

  // Registro correcto
  this.mensajeExito = 'Usuario registrado correctamente';

  // Enviar al inicio de sesión
  this.router.navigate(['/login']);
}

}
