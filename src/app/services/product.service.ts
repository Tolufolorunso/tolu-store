import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { AppService } from './app.service';
import { API_URL } from '../contant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //@ts-ignore
  user: User = localStorage.getItem('user') || null;
  headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  category = ['general', 'phone', 'home', 'men', 'women'];

  constructor(private http: HttpClient, private appService: AppService) {}

  create(data: any): Observable<{}> {
    const formData: FormData = new FormData();

    formData.append('file', data.file);
    formData.append('description', data.description);
    formData.append('stock', data.stock);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('name', data.name);

    console.log(data);
    return this.http.post<Product>(`${API_URL}/products`, formData, {
      headers: this.headers,
    });
  }

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`, {
      headers: this.headers,
    });
  }

  getSingleProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${productId}`);
  }

  addToCart(data: object): void {
    const order = this.getOrderFromLocalStore();
    const products = [...order, data];
    localStorage.setItem('products', JSON.stringify(products));
    this.appService.showAlert({
      message: 'Product added to cart',
      show: true,
      type: 'success',
    });
    setTimeout(() => {
      this.appService.clearAlert();
    }, 1500);
  }

  getOrderFromLocalStore() {
    //@ts-ignore
    let res = JSON.parse(localStorage.getItem('products'));
    return res ? res : [];
  }
}
