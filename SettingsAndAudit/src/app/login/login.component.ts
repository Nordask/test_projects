import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {LoginService} from "../core/services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string;
  password: string;
  message: string;

  constructor(private loggedService:LoginService, private router: Router) {}

  onLoginClick(loginForm) {
    if(loginForm.valid == true) {
      if(this.loggedService.checkLoginAndPassword(this.login, this.password)) {
        this.message = "Successfully Login";
        this.loggedService.isLoggednIn();
        this.router.navigate(['/settings']);
      } else {
        this.message = "Invalid Login";
      }
    }
  }
}
