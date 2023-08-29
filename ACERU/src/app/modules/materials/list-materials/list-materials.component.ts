import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Categoria } from '../../problems/model/categoria';
import { DataService } from 'src/app/shared/services/data-service';
import { CategoriaService } from '../services/categoria.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.less'],
})
export class ListMaterialsComponent implements OnInit {

  data: Categoria[] = [];
  idCategoria?: any;
  nombreCategoria?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(({ params }: any) => {

      this.idCategoria = parseInt(params.id);
      this.nombreCategoria = params.nombre;
  
      if (typeof this.idCategoria === 'number') {
        this.obtenerListadoCategori( this.idCategoria);

      } else {
        console.error("idCategoria is undefined or not a number");
      }
    });
  }
  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.router.navigate(['/materials/category/new-material'])
  }

  // edit
  redirectWithCategoryData(categoryData: any): void {
    // this.dataService.clearData()
    // this.dataService.setData(categoryData);
    // this.router.navigate(['materials/new-category']);
  }

  obtenerListadoCategori(id: number){
    this.materialService.getListarMaterial(id).subscribe( {
      next: (data) => {
        this.data = data
        //console.log("Material ", this.data)
      },
      error: (err) =>{
        //console.log("Error ", err.error)
      }
    })
  }


  holitas(){
    console.log("holaaaaaaaaaaaaaaaaaaaaaa")
  }
}
