import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-store';
  show: boolean = false;
  showMessage: string = '';
  type: string = '';

  constructor(private appServices: AppService) {}

  ngOnInit(): void {
    this.appServices.showAlertAction.forEach((d: any) => {
      this.showMessage = d.message;
      this.show = d.show;
      this.type = d.type;
    });
  }

  close() {
    this.appServices.clearAlert();
  }
}
