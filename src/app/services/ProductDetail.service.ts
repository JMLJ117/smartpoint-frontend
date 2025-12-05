import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetailDTO } from '../interfaces/ProductDetail.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailService {

  private baseUrl = '/api/productos';

  constructor(private https: HttpClient) {}

  getProductDetailsById(id: number): Observable<ProductDetailDTO> {
    return this.https.get<ProductDetailDTO>(`${this.baseUrl}/${id}`);
  }

}
