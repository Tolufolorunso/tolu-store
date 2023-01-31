import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/Cart';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../contant';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsCart: CartProduct[] =
    // @ts-ignore
    JSON.parse(localStorage.getItem('products')) || [];
  headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  constructor(private http: HttpClient) {}

  completeOrder(id: string): Observable<object> {
    const data = {
      userId: id,
      status: true,
      products: this.productsCart.map((product) => {
        return { productId: product._id, quantity: product.quantity };
      }),
    };

    return this.http.post<object>(`${API_URL}/orders`, data, {
      headers: this.headers,
    });
  }

  calculateProduct() {
    return this.productsCart.reduce(
      (acc: number, curr: CartProduct): number => {
        // @ts-ignore
        return acc + curr?.quantity * curr?.product.price;
      },
      0
    );
  }
}
