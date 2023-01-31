import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private appService: AppService,
    private router: Router
  ) {
    const { token } = this.auth.getUser();
    if (token) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.appService.clearAlert();
  }

  register(): void {
    this.loading = true;
    const user = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password,
    };

    this.auth.register(user).subscribe({
      next: (response: any) => {
        const { message, user } = response;
        this.appService.showAlert({
          message: `${message}, Welcome ${user.firstname}`,
          type: 'success',
          show: true,
        });
      },
      error: (err) => {
        const {
          error: { message },
          statusText,
        } = err;
        this.loading = false;
        if (statusText === 'Unknown Error') {
          this.appService.showAlert({
            message: 'Try again later, server down',
            show: true,
          });
          return;
        }

        this.appService.showAlert({
          message,
          show: true,
        });
      },
      complete: () => {
        this.username = '';
        this.firstname = '';
        this.lastname = '';
        this.password = '';

        setTimeout(() => {
          this.router.navigate(['/users/login']);
        }, 3000);
        this.loading = false;
      },
    });
  }
  close(): void {
    this.appService.clearAlert();
  }
}
