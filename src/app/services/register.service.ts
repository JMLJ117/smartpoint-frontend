// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterDTO } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private readonly registroUrl = '/api/auth/cliente/registro'

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo cliente en el backend.
   * @param payload Datos del usuario a registrar.
   * @returns Observable con la respuesta del backend.
   */
  
  registroCliente(payload: RegisterDTO): Observable<any> {
    console.log('📤 Enviando registro de cliente:', payload);

    return this.http.post(this.registroUrl, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        // Solo loguea el error, pero relanza el error original para que el componente lo maneje correctamente
        console.error('❌ Error en registroCliente():', error);
        return throwError(() => error);
      })
    );
  }
}
