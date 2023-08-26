import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.less'],
})
export class ListMaterialsComponent implements OnInit {
  @Input() data: any = DATA_CATEGORY_PROBLEMS;
  idCategory: any;
  title: any = 'Introducción a la programación';
  constructor(
    private route: ActivatedRoute,
    private serviceNavigation: NavigationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.getRegisterUserLogged()?.rol === 'Administrador') {
      this.title = 'Material de Apoyo';
    }
    this.route.paramMap.subscribe(({ params }: any) => {
      console.log(params);
      this.idCategory = params.id;
    });
    console.log(this.route.url);
  }
  clearSearch() {}

  redirect(page: string, parameter?: any) {
    //   console.log(page);
    // if(parameter)
    //     this.serviceNavigation.redirect(page+this.idCategory+'/'+ parameter)
    //     else
    this.router.navigate(['/materials/category/new-material'])
  }
}
