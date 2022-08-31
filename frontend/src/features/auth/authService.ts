import axios from 'axios';
import { UserDTO } from '../../types/UserDTO';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

const authService = {
  register(user: UserDTO) {
    return apiClient.post<UserDTO>('/', user);
  },
};

export default authService;
