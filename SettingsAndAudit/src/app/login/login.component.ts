import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string;
  password: string;
  message: string;

  constructor(@Inject(LoginService) private s:LoginService) {}

  onLoginClick(myForm) {
    console.log(myForm)
    if(myForm.valid == true) {
      if(this.s.checkLoginAndPassword(this.login, this.password)) {
        this.message = "Successfully Login";
      } else {
        this.message = "Invalid Login";
      }
    }
  }
}
