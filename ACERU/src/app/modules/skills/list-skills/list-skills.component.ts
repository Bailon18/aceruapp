import { Component, Input, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DATA_CATEGORY_HEADERS, DATA_CATEGORY_HEADERS_P, DATA_CATEGORY_SKILLS, DATA_CATEGORY_SKILLS_P } from 'src/app/shared/constants/constants-skills';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.less']
})
export class ListSkillsComponent implements OnInit {
  @Input() data:any = DATA_CATEGORY_SKILLS
  @Input() headers = DATA_CATEGORY_HEADERS

  faSearch = faSearch;
  faTimes = faTimes;
  idActual: any

  constructor( private serviceNavigation: NavigationService, private userService: UserService) { }

  ngOnInit() {

    if(this.userService.getRegisterUserLogged()?.rol==="Participante")
    {
        this.data=DATA_CATEGORY_SKILLS_P;
        this.headers= DATA_CATEGORY_HEADERS_P ;
    }
  }
  clearSearch() {

  }

  redirect(page: string, parameter?: any) {
    console.log(page);

    this.serviceNavigation.redirect(page, parameter)
  }
}
