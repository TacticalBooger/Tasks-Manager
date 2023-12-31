import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserDataService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service.isLoggedIn()) { //checks for role and if role valid, if valid it enables routing to components accordingly
      const userRole = this.service.getUserRole();
      if (route.data['roles'].includes(userRole)) {
        return true;
      } else {
        this.router.navigate(['/login_page']);
        return false;
      }
    } else {
      this.router.navigate(['/login_page']);
      return false;
    }
  }
}
