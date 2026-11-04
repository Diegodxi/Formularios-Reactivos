
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  nombreUsuario: string;

  constructor(
    private router: Router,
    private auth: AutenticacionService
  ) {
    this.nombreUsuario = auth.obtenerNombre();
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
