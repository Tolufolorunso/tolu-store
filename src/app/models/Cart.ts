import { Product } from './Product';

export class CartProduct {
  _id: string;
  quantity: number;
  product: Product;

  constructor() {
    this._id = '';
    this.quantity = 1;
    this.product = new Product();
  }
}
