import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private userService: UserService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userService.islogIn();
    if (user &&!route?.data['login'] ) {

          return true;
    }
    if(!user&&route?.data['login'])
    {
          return true;
    }
    this.router.navigate(['home'])
        return false;
    }
}
