import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-problem-category',
  templateUrl: './problem-category.component.html',
  styleUrls: ['./problem-category.component.less'],
})
export class ProblemCategoryComponent implements OnInit {
  
  faSearch = faSearch;
  faTimes = faTimes;
  data = DATA_CATEGORY_PROBLEMS;

  constructor(
    private serviceNavigation: NavigationService,
    private userService: UserService
  ) {}


  ngOnInit() {}

  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }
  
}
