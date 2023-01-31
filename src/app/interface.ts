import { User } from './models/User';

export interface ShowError {
  message: string;
  type?: string;
  show?: boolean;
}

export interface GetUser {
  token: string;
  user: User;
}
