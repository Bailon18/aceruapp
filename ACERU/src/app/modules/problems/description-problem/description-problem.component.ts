import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CodeWindowComponent } from 'src/app/shared/components/code-window/code-window.component';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { EXERCISES } from 'src/app/shared/constants/constants-submissions';
import { DataService } from 'src/app/shared/services/data-service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-description-problem',
  templateUrl: './description-problem.component.html',
  styleUrls: ['./description-problem.component.less'],
})
export class DescriptionProblemComponent implements OnInit {
 
  faSearch = faSearch;
  faTimes = faTimes;
  idCategory: any;
  idProblem: any;
  dataProblema: any;

  constructor(
    private serviceNavigation: NavigationService,
    private route: ActivatedRoute,
    private dataservice: DataService<any>,
    private router: Router
  ) {}

  ngOnInit() {

    this.dataProblema = this.dataservice.getData();
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategory = params.idCategory;
      this.idProblem = params.idProblem;
    });
  }
  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page + this.idCategory, parameter);
  }

  openConsol(event = EXERCISES.data[0]) {
  }

  retornar(){
    this.router.navigate(['/problems/category/'+this.idCategory+'/'+this.dataProblema.categoria.nombre]);
  }

}
