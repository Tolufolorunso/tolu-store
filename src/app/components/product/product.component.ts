import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/contant';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  imgUrl!: string;
  stocks: number[] = [];
  quantity: number = 1;

  // @ts-ignore
  productsCart: Product[] = JSON.parse(localStorage.getItem('products')) || [];
  isProductExistsInCart: boolean = false;

  @Output() addProductToCart: EventEmitter<object> = new EventEmitter();

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.imgUrl = `${API_URL}/${this.product.imageurl}`;
    for (let i = this.product.stock; i >= 1; i--) {
      this.stocks.unshift(i);
    }
    this.productsCart.forEach((product: any) => {
      if (product._id === this.product._id) {
        this.isProductExistsInCart = true;
        this.quantity = product.quantity;
      }
    });
  }

  addToCart(productId: any): void {
    this.addProductToCart.emit({ _id: productId, quantity: +this.quantity });
    this.isProductExistsInCart = true;
  }

  quantityChange(event: any): void {
    this.quantity = event.target.value as unknown as number;
  }
}
