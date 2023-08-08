import { Component, OnInit } from '@angular/core';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-materials-category',
  templateUrl: './materials-category.component.html',
  styleUrls: ['./materials-category.component.less']
})
export class MaterialsCategoryComponent implements OnInit {

  data=DATA_CATEGORY_PROBLEMS
  constructor(private serviceNavigation:NavigationService,private userService: UserService) { }

  ngOnInit() {

  }
  clearSearch()
  {

  }
  redirect(page:string, parameter?:any)
  {
    this.serviceNavigation.redirect(page,parameter)
  }
}
