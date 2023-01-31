import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit, OnDestroy {
  orderDetail!: any;

  ngOnDestroy(): void {
    localStorage.removeItem('orderDetail');
    localStorage.removeItem('products');
  }

  constructor(private route: Router) {
    //@ts-ignore
    this.orderDetail = JSON.parse(localStorage.getItem('orderDetail'));
    if (!this.orderDetail) {
      route.navigate(['/cart']);
    }
  }

  ngOnInit(): void {}
}
