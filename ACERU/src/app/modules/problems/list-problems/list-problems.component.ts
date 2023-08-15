import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  DATA_CATEGORY_HEADERS,
  DATA_CATEGORY_HEADERS_P,
  DATA_CATEGORY_PROBLEMS,
  DATA_CATEGORY_PROBLEMS_P,
} from 'src/app/shared/constants/constants-problems';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Problema } from '../model/problema';
import { ProblemaService } from '../services/problema.service';
import { ThemePalette } from '@angular/material/core';
import { DataService } from 'src/app/shared/services/data-service';

@Component({
  selector: 'app-list-problems',
  templateUrl: './list-problems.component.html',
  styleUrls: ['./list-problems.component.less'],
})
export class ListProblemsComponent implements AfterViewInit , OnInit {

  @Input() exercises: any = DATA_CATEGORY_PROBLEMS;
  @Input() headers = DATA_CATEGORY_HEADERS;

  data: any;
  faSearch = faSearch;
  faTimes = faTimes;
  idCategoria?: any;
  showInactivos = false; // Variable para controlar el estado del checkbox

  // ###########################################################

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'EJERCICIO', 'DIFICULTAD', 'ACCIONES'];
  dataSource = new MatTableDataSource<Problema>([]);

  constructor(
    private route: ActivatedRoute,
    private serviceNavigation: NavigationService,
    private  problemaService: ProblemaService,
    private dataservice: DataService<any>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {

      this.idCategoria = parseInt(params.id);
  
      if (typeof this.idCategoria === 'number') {
        this.listarProblemas(this.idCategoria, "Activo");
      } else {
        console.error("idCategoria is undefined or not a number");
      }
    });

  }
  

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }

  listarProblemas(idCategoria: number, estado: string ){
    this.problemaService.getListarProblema(idCategoria, estado).subscribe({
      next: (dato) =>{
        this.dataSource = new MatTableDataSource(dato)
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>{

      }
    })
  }

  mostrarInactivos(){

    if (this.showInactivos) {
      this.listarProblemas(this.idCategoria, "Activo")
    } else {
      this.listarProblemas(this.idCategoria, "Inactivo")
    }
  }


}
