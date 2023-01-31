import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowError } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private showAlertSubject = new Subject<{}>();
  showAlertAction = this.showAlertSubject.asObservable();

  showAlert({ message, type, show }: ShowError) {
    this.showAlertSubject.next({
      message: message,
      type: type || 'danger',
      show: show,
    });
  }

  clearAlert(): void {
    this.showAlert({ message: '', type: '', show: false });
  }
}
