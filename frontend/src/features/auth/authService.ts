import axios from 'axios';
import { Login } from '../../types/Login';
import { UserDAO } from '../../types/UserDAO';
import { UserDTO } from '../../types/UserDTO';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

const authService = {
  register(user: UserDTO) {
    return apiClient.post<UserDAO>('/', user);
  },
  login(data: Login) {
    return apiClient.post<UserDAO>('/login', data);
  },
};

export default authService;
