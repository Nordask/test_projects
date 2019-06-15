import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    
    if(this.loginService.isLoggednIn()) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
    
   /*
   this.loginService.isLoggednIn().then(status => {
     if(status === false) {
       this.router.navigate(["login"]);
     }
     resolve(status);
   }).catch(() => {
     this.router.navigate(['login']);
     resolve(false);
   })*/
  }
}
