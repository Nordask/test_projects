import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {LoginService} from "../core/services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit, AfterContentChecked {
  isLogged: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private loginService: LoginService) {}

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
