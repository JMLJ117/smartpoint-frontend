// src/app/services/ventas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta-admin.interface';

@Injectable({
  providedIn: 'root'
})

export class VentasService {

  private baseUrl = '/api'; 

  constructor(private https: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.https.get<Venta[]>(`${this.baseUrl}/admin/ventas`);
  }

  // Cancelar una venta por id
  cancelarVenta(idventas: number): Observable<void> {
    return this.https.put<void>(`${this.baseUrl}/ventas/${idventas}/cancelar`, {});
  }
}
