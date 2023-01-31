import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { AppService } from 'src/app/services/app.service';
import { ShowError } from 'src/app/interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  name: string = '';
  price: number = 0;
  file!: any;
  description: string = '';
  category: string = '';
  stock: number = 1;
  preview: string = '';
  loading: boolean = false;

  options: string[] = [];

  constructor(
    private productService: ProductService,
    private appService: AppService,
    private router: Router
  ) {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role === 'user') {
      this.router.navigate(['/users/login']);
    }
  }

  ngOnInit(): void {
    this.options = this.productService.category;
  }

  // @ts-ignore
  selectFile($event): void {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    let preview;
    reader.onloadend = () => {
      preview = reader.result;
      this.preview = reader.result as unknown as string;
    };
    reader.readAsDataURL(this.file);
  }

  addProduct(): void {
    this.loading = true;
    this.appService.clearAlert();
    const canCreateProduct = [
      this.name,
      this.price,
      this.stock,
      this.description,
      this.file,
    ].every(Boolean);

    if (!canCreateProduct) {
      this.appService.showAlert({
        message: 'Name, price, stock, description are all required',
        show: true,
      });
      return;
    }

    const product: Product = {
      name: this.name,
      price: this.price,
      file: this.file,
      description: this.description,
      category: this.category,
      stock: this.stock,
    };

    this.productService.create(product).subscribe({
      next: (response: any) => {
        this.appService.showAlert({
          message: response.message,
          type: 'success',
          show: true,
        });
      },
      error: (err) => {
        const {
          error: { message },
          statusText,
        } = err;

        if (statusText === 'Unknown Error') {
          this.appService.showAlert({
            message: 'Server down or something went wrong. try again later',
            show: true,
          });
          return;
        }
        this.appService.showAlert({ message: message, show: true });
        this.loading = false;
      },
      complete: () => {
        setTimeout(() => {
          this.appService.clearAlert();
        }, 3000);
        this.name = '';
        this.description = '';
        this.price = 0;
        this.category = '';
        this.file = '';
        this.stock = 1;
        this.loading = false;
      },
    });
  }
}
