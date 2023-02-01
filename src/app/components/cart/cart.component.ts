import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartProduct } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { AppService } from 'src/app/services/app.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  productsCart: CartProduct[] =
    // @ts-ignore
    JSON.parse(localStorage.getItem('products')) || [];

  total: number = 0;
  form: any;
  loading: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private cartService: CartService,
    private appService: AppService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(6)]],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  get fc() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.total = this.calculateProduct();
  }

  ngOnDestroy(): void {}

  submitOrder(form: NgForm): void {
    this.loading = true;
    const data = this.authService.getUser();
    if (!data.token) {
      localStorage.setItem('currLocation', this.route.url);
      this.route.navigate(['/users/login']);
      return;
    }

    if (this.productsCart.length === 0) {
      this.appService.showAlert({
        message: 'Add product to cart',
        show: true,
      });

      setTimeout(() => {
        this.appService.clearAlert();
      }, 1500);
      this.route.navigate(['/']);
      return;
    }

    this.cartService.completeOrder(data.user._id).subscribe({
      next: (response: any) => {
        this.appService.showAlert({
          message: response.message,
          type: 'success',
          show: true,
        });
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        const orderDetail = { ...form.value, total: this.calculateProduct() };
        localStorage.setItem('orderDetail', JSON.stringify(orderDetail));
        setTimeout(() => {
          this.appService.clearAlert();
        }, 1500);
        this.route.navigate(['/orders/success']);
        this.loading = false;
      },
    });
  }

  increase(id: string): void {
    this.productsCart.forEach((cart: CartProduct) => {
      if (cart._id === id && cart.quantity <= cart.product.stock) {
        cart.quantity++;
        localStorage.setItem('products', JSON.stringify(this.productsCart));
        this.total = this.calculateProduct();
      }
    });
  }
  decrease(id: string): void {
    this.productsCart.forEach((cart: CartProduct) => {
      if (cart._id === id) {
        cart.quantity--;
        localStorage.setItem('products', JSON.stringify(this.productsCart));
        this.total = this.calculateProduct();
      }
      if (cart.quantity === 0) {
        this.productsCart = this.productsCart.filter((p) => p._id != id);
        localStorage.setItem('products', JSON.stringify(this.productsCart));
      }
    });
  }

  calculateProduct(): number {
    return this.productsCart.reduce(
      (acc: number, curr: CartProduct): number => {
        // @ts-ignore
        return acc + curr.quantity * curr.product.price;
      },
      0
    );
  }
}
