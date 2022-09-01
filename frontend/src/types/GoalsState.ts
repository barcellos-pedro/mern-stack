import { Goal } from './Goal';

export type GoalsState = {
  error: boolean;
  loading: boolean;
  message: string;
  goals: Array<Goal>;
};
