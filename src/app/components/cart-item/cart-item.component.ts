import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_URL } from 'src/app/contant';
import { CartProduct } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartProduct;
  imgUrl: string = '';

  @Output() increaseQuantity: EventEmitter<string> = new EventEmitter();
  @Output() decreaseQuantity: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.imgUrl = this.cartItem.product.imageurl as unknown as string;
  }

  increase(productId: string): void {
    if (this.cartItem.quantity === this.cartItem.product.stock) return;
    this.increaseQuantity.emit(productId);
  }

  decrease(productId: string): void {
    this.decreaseQuantity.emit(productId);
  }
}
