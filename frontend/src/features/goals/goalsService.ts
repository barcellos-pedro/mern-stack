import axios from 'axios';
import { Goal } from '../../types/Goal';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/goals',
});

const goalsService = {
  getGoals(token: string) {
    return apiClient.get<Goal[]>('/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default goalsService;
