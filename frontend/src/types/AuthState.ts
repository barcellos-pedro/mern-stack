import { UserDAO } from './UserDAO';

export type AuthState = {
  user: UserDAO | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
};
