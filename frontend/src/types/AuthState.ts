import { UserDAO } from './UserDAO';

export type AuthState = {
  user: UserDAO | null;
  error: boolean;
  loading: boolean;
  message: string;
};
