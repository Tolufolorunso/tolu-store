export class User {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  role?: string;

  constructor() {
    this.id = 1;
    this.firstname = '';
    this.username = '';
    this.lastname = '';
    this.role = '';
  }
}
