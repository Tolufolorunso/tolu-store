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
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.index().subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
      },
    });
  }

  addProductToCart(event: any): void {
    // @ts-ignore
    event.product = this.products.find((p) => {
      return p._id === event._id;
    });
    this.productService.addToCart(event);
  }
}
