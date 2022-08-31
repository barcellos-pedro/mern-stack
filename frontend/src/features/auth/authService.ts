import axios from 'axios';
import { UserDAO } from '../../types/UserDAO';
import { UserDTO } from '../../types/UserDTO';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

const authService = {
  register(user: UserDTO) {
    return apiClient.post<UserDAO>('/', user);
  },
};

export default authService;
