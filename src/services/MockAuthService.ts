import AuthService from './AuthService';
import { LoginRequest, User } from '../types/auth';

export default class MockAuthService extends AuthService {
  public async login({ username, password }: LoginRequest): Promise<User> {
    if (username === 'user' && password === 'pass') {
      return {
        name: 'El Capon',
        avatar:
          'https://robohash.org/ed1139a34b4e3f3dc0c5c70d4b0a3b62?set=set4&bgset=&size=400x400'
      };
    }
    throw new Error('User Not Found');
  }
}
