import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DATA_CATEGORY_HEADERS, DATA_CATEGORY_HEADERS_P, DATA_CATEGORY_PROBLEMS, DATA_CATEGORY_PROBLEMS_P } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-list-problems',
  templateUrl: './list-problems.component.html',
  styleUrls: ['./list-problems.component.less']
})
export class ListProblemsComponent implements OnInit {
 @Input() exercises:any = DATA_CATEGORY_PROBLEMS
 @Input() headers = DATA_CATEGORY_HEADERS
  data: any
  faSearch = faSearch;
  faTimes = faTimes;
  idActual: any
  constructor(private route: ActivatedRoute, private serviceNavigation: NavigationService, private userService: UserService) { }

  ngOnInit() {

    if(this.userService.getRegisterUserLogged()?.rol==="Participante")
    {
        this.exercises=DATA_CATEGORY_PROBLEMS_P;
        this.headers= DATA_CATEGORY_HEADERS_P ;
    }
    this.route.paramMap.subscribe(({ params }: any) => {
      console.log(params);
      this.idActual = params.id;
      this.data = this.exercises.filter((res:any) => res.id === Number(params.id))[0]
    })
    console.log(this.route.url);

  }
  clearSearch() {

  }

  redirect(page: string, parameter?: any) {
    console.log(page);

    this.serviceNavigation.redirect(page, parameter)
  }
}
