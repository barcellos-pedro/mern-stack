import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

const authService = {
  register(user: any) {
    return apiClient.post('/', user);
  },
};

export default authService;
