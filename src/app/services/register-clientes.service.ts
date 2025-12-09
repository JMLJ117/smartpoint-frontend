import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { 
  ClienteListDTO, 
  ClienteUpdateDTO, 
  ClienteRegisterDTO 
} from '../interfaces/register-cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminClientesService {

  private readonly baseUrl = '/api/admin/clientes';

  constructor(private http: HttpClient) {}

  private manejarError(error: HttpErrorResponse) {
    // Solo loguea el error, pero relanza el error original para que el componente lo maneje correctamente
    console.error('❌ Error en AdminClientesService:', error);
    return throwError(() => error);
  }

  //  LISTAR CLIENTES (ADMIN)
  listarClientes(): Observable<ClienteListDTO[]> {
    return this.http.get<ClienteListDTO[]>(this.baseUrl).pipe(
      catchError((err) => this.manejarError(err))
    );
  }

  // EDITAR CLIENTE DESDE ADMIN
  actualizarCliente(telefono: string, payload: ClienteUpdateDTO): Observable<any> {
    console.log(`✏️ Editando cliente ${telefono}:`, payload);

    return this.http.put(`${this.baseUrl}/${telefono}`, payload).pipe(
      catchError((err) => this.manejarError(err))
    );
  }

  // ELIMINAR CLIENTE DESDE ADMIN
  eliminarCliente(telefono: string): Observable<void> {
    console.log(`🗑 Eliminando cliente ${telefono}`);

    return this.http.delete<void>(`${this.baseUrl}/${telefono}`).pipe(
      catchError((err) => this.manejarError(err))
    );
  }

  //  REGISTRAR CLIENTE NUEVO (AUTH)
  registrarCliente(payload: ClienteRegisterDTO): Observable<any> {
    console.log('📤 Registrando cliente:', payload);

    return this.http.post('/api/auth/cliente/registro', payload).pipe(
      catchError((err) => this.manejarError(err))
    );
  }

}
