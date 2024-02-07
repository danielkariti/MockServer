import axios from 'axios';
import { IUser } from '../models/interfaces/IUser';
const config = require(`../../config/default.json`);

class CacheService {
  private users: IUser[];
  private loggedInUsers: Map<string, IUser>;

  constructor() {
    this.users = [];
    this.loggedInUsers = new Map();
  }

  setLoggedInUser(user: IUser): void {
    this.loggedInUsers.set(user.id.toString(), user); // Assuming user id is unique
  }

  getLoggedInUser(userId: string): IUser | undefined {
    return this.loggedInUsers.get(userId);
  }

  removeLoggedInUser(userId: string): void {
    this.loggedInUsers.delete(userId);
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  getUsers(page: number): IUser[] {
    // Assuming 5 users per page, we calculate the start index
    const startIndex = (page - 1) * 5;
    // Return 5 users from the calculated start index
    return this.users.slice(startIndex, startIndex + 5);
  }
  getAllUsers(): IUser[] {
    return this.users;
  }

  async populateCacheData() {
    try {
      const { data } = await axios.get(`${config.usersApi.baseUrl}`);
      this.setUsers(data.data);
    } catch (error) {
      console.error('Error populating cache data:', error);
    }
  }

  getUserById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(newUser: IUser): void {
    this.users.push(newUser);
  }

  updateUser(updatedUser: IUser): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export const cacheService = new CacheService();
