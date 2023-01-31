import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { API_URL } from 'src/app/contant';
import { Product } from 'src/app/models/Product';
import { AppService } from 'src/app/services/app.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;
  imgUrl!: string;
  alt!: string;
  productName!: string;
  productPrice!: number;
  productDesc!: string;
  isProductExistsInCart: boolean = false;
  stocks: number[] = [];
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private appServce: AppService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((val: ParamMap) => {
      this.productId = val.get('productId') as unknown as number;
      this.productService.getSingleProduct(this.productId).subscribe({
        next: (data: any) => {
          this.product = data.product;
          this.imgUrl = `${API_URL}/${this.product.imageurl}`;
          this.alt = this.product.name;
          this.productName = this.product.name;
          this.productPrice = this.product.price as unknown as number;
          this.productDesc = this.product.description;
          for (let i = this.product.stock; i >= 1; i--) {
            this.stocks.unshift(i);
          }
        },
        error: (err) => {
          this.appServce.showAlert({
            message: err.message,
            show: true,
          });
        },
      });
    });

    this.productService.getOrderFromLocalStore().forEach((p: any) => {
      console.log(p.productId, this.productId);
      console.log(p.productId === this.productId);
      if (p.productId == this.productId) {
        this.isProductExistsInCart = true;
        this.quantity = p.quantity;
      }
    });
  }

  // addToCart(id: number) {}
  quantityChange(event: any): void {
    this.quantity = event.target.value as unknown as number;
    // console.log(32, event.target.value, this.quantity);
  }

  addToCart(): void {
    this.productService.addToCart({
      productId: +this.productId,
      quantity: +this.quantity,
      product: this.product,
    });
    this.isProductExistsInCart = true;
  }
}
