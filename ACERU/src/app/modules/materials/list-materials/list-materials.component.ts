import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Categoria } from '../../problems/model/categoria';
import { DataService } from 'src/app/shared/services/data-service';
import { CategoriaService } from '../services/categoria.service';
import { MaterialService } from '../services/material.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from '../model/model';
import swall from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.less'],
})
export class ListMaterialsComponent implements AfterViewInit , OnInit {

  data: any;
  idCategoria?: any;
  nombreCategoria?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'MATERIAL', 'DESCRIPCION', 'TIPO MATERIAL', 'ACCIONES'];
  dataSource = new MatTableDataSource<Material>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private dataservice: DataService<any>,
    private cdr: ChangeDetectorRef
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

  editarMaterial(fila: any){
    this.router.navigate(['/materials/new-material/'+this.idCategoria+'/'+this.nombreCategoria+'/'+fila.id])
  }

  eliminarMaterial(fila: any){

    swall
    .fire({
      html: `¿Estás seguro que deseas desabilitar :  <strong>${fila.nombre}?</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.materialService
          .eliminarMaterial(fila.id)
          .subscribe({
            next: () => {
              swall.fire(
                'Eliminado!',
                'Se a eliminado la material correctamente',
                'success'
              );

              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/materials/category/' + this.idCategoria + '/' + this.nombreCategoria], { // la url para ir a la lista
                relativeTo: this.route,
              });
            
            },
            error: () => {
              swall.fire(
                'Eliminado',
                'No se pudo eliminar el material',
                'warning'
              );
            },
          });
      }
    });

  }

  detalleMaterial(fila: any) {
    const elementoDetalle = this.data.find((item: any) => item.id === fila.id);
    if (elementoDetalle) {
      this.router.navigate(['/materials/category/presentation-material/'+fila.material.id+'/'+fila.id])
    } 
  }
  

  mostrarformnuevomaterial() {
    this.router.navigate(['/materials/new-material/'+this.idCategoria+'/'+this.nombreCategoria])
  }


  redirectWithCategoryData(categoryData: any): void {

  }

  obtenerListadoCategori(id: number) {
    this.materialService.getListarMaterial(id).subscribe({
      next: (data) => {
        // Crear una copia de los datos sin el campo 'archivo'
        this.data = data;
        const dataWithoutArchivo = data.map((item: any) => {
          const { archivo, ...itemWithoutArchivo } = item;
          return itemWithoutArchivo;
        });
  
        this.dataSource = new MatTableDataSource(dataWithoutArchivo);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (err) => {

      }
    });
  }
  

  holitas(){
    console.log("holaaaaaaaaaaaaaaaaaaaaaa")
  }
}
