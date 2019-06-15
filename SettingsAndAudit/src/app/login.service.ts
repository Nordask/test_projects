import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  login: string = 'admin';
  password: string = 'admin1';

  public checkLoginAndPassword(login: string, password: string): boolean {
    if(login == this.login && password == this.password) {
      let user = {login: login, password: password};
      localStorage.currentUser = JSON.stringify(user);
      return true;
    }

    return false;
  }

  isLoggednIn(){
    if(localStorage.getItem('currentUser')) {
      return true;
    }

    return false;
  }
  
}
