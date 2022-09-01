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
  createGoal(data: { text: string }, token: string) {
    return apiClient.post<Goal>('/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteGoal(id: string, token: string) {
    return apiClient.delete<{ id: string }>(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateGoal(data: { text: string; id: string }, token: string) {
    const { id, text } = data;
    
    return apiClient.put<Goal>(
      `/${id}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default goalsService;
