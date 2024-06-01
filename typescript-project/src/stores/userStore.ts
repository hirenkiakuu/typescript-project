import { IUser } from "../model/user";
import { makeAutoObservable } from "mobx";

class UserStore {
  users: IUser[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = users;
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUserById(id: number): IUser | undefined {
    return this.users.find(user => user.id === id);
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
      this.users = JSON.parse(usersFromStorage);
    }
  }

  patchUser(id: number, updatedData: Partial<IUser>) {
    this.users = this.users.map(user => 
      user.id === id ? { ...user, ...updatedData } : user
    );
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: IUser) {
    user.id = Number(user.id);
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  initializeDefaultUser() {
    
      const defaultUser: IUser = {
        id: Math.floor(Math.random() * 10), 
        first_name: "Владислав",
        last_name: "Андреев",
        email: "example@gmail.com",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvrzdvTx2PTaA1_W6e2uODoBTLazA7J783A&s",
        job: "Безработный",
        hobbie: "Программирование",
      };
      this.setUsers([defaultUser]);
  }
}

const userStore = new UserStore();
userStore.initializeDefaultUser();

export default userStore;
