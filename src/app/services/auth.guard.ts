import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Usar el observable del usuario actual para verificar autenticación
    return this.authService.getCurrentUser().pipe(
      take(1), // Tomar solo el primer valor emitido
      map(user => {
        if (user) {
          return true; // Usuario autenticado, permitir acceso
        } else {
          // Usuario no autenticado, redirigir a login
          this.router.navigate(['/tabs/tab4']);
          return false;
        }
      })
    );
  }
}
