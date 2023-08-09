import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-problem-category',
  templateUrl: './problem-category.component.html',
  styleUrls: ['./problem-category.component.less'],
})
export class ProblemCategoryComponent implements OnInit {
  
  faSearch = faSearch;
  faTimes = faTimes;
  data: Categoria[] = [];

  constructor(
    private serviceNavigation: NavigationService,
    private categoriaService: CategoriaService
  ) {}


  ngOnInit() {

    this.categoriaService.getListarCategoria().subscribe( {
      next: (data) => {
        this.data = data
        console.log("DATA: ", this.data)
      },
      error: (err) =>{
        console.log("Error ", err.error)
      }
    })

  }

  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }
  
}
