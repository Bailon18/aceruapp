import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(
    private router: Router,
    private userService: UserService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const rol = this.userService.getRegisterUserLogged()?.rol;
    if (rol===route.data['rol']) {
          return true;
    }
    this.router.navigate(['home'])
    return false;
}
}
