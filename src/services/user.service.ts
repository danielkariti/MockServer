import { IUser } from '../models/interfaces/IUser';
import { authService } from './auth.service';
import { cacheService } from './cache.service';

export class UserService {
  async getUsers(page: number): Promise<IUser[]> {
    return cacheService.getUsers(page);
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    return cacheService.getUserById(id);
  }

  async createUser(newUser: IUser): Promise<void> {
    const users = cacheService.getAllUsers(); // Assuming all users are cached on page 1
    users.push(newUser);
    cacheService.setUsers(users);
  }

  async updateUser(id: string, updatedUser: IUser): Promise<void> {
    const users = cacheService.getAllUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = updatedUser;
      cacheService.setUsers(users);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const users = cacheService.getAllUsers();
    const filteredUsers = users.filter((user) => user.id !== id);
    cacheService.setUsers(filteredUsers);
  }

  async login(email: string): Promise<string | null> {
    const users = cacheService.getAllUsers();

    const user = users.find((user) => user.email === email);
    if (user) {
      cacheService.setLoggedInUser(user);
      const token = authService.generateToken(user);
      return token;
    }
    return null;
  }
}
