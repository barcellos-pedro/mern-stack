import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

const authService = {
  register(user: any) {
    return apiClient.post('/api/users', user);
  },
};

export default authService;
