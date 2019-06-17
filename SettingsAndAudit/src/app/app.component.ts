import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'SettingsAndAudit';
  isLogged: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.isLogged = this.loginService.isLoggednIn();
    if(this.isLogged === false) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');  
    this.isLogged = this.loginService.isLoggednIn();
  }

  ngAfterContentChecked() {
    this.isLogged = this.loginService.isLoggednIn();
  }
}
