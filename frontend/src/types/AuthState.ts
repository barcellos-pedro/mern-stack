import { User } from './User';

export type AuthState = {
  user: User | null;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
};
