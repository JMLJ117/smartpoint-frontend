// src/app/services/register.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginDTO } from '../interfaces/login.interface';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
  id: string;
  nombre: string;
  rol: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly loginUrl = '/api/auth/cliente/login';

  constructor(
    private https: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  iniciarSesion(payload: LoginDTO): Observable<LoginResponse> {

    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Login solo disponible en navegador.'));
    }

    return this.https.post<LoginResponse>(this.loginUrl, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        const mensaje =
          error.error?.mensaje ??
          error.message ??
          'Error desconocido al iniciar sesión';

        return throwError(() => new Error(mensaje));
      })
    );
  }
}
