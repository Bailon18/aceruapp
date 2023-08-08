import { TokenService } from './../../../modules/auth/services/token.service';
import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TEXT_LINKS_ADMINISTRATOR, TEXT_LINKS_P } from "../../constants/constants-navbar";
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  
  faSearch = faSearch;
  faTimes = faTimes;
  TEXT_LINKS = TEXT_LINKS_P;
  textLinks: any;

  constructor(
    private serviceNavigation: NavigationService,
    public userService: UserService,
    public tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.textLinks = TEXT_LINKS_P;
  }

  redirect(page: string) {
    this.serviceNavigation.redirect(page);
  }

  getActualPage(page: string): any {
    return this.serviceNavigation.getActualPage(page);
  }

  logOut() {
    this.tokenService.logOut();
    this.redirect('home');
  }

  mostra(): boolean {
    return this.userService.islogIn() && !this.getActualPage('home');
  }
}
