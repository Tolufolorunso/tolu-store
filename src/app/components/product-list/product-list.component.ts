import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.index().subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  addProductToCart(event: any): void {
    // @ts-ignore
    event.product = this.products.find((p) => {
      console.log(event);
      return p._id === event._id;
    });
    this.productService.addToCart(event);
  }
}
