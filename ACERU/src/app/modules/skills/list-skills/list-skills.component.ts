import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Competencia } from '../model/competencia';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { MatPaginator } from '@angular/material/paginator';
import { CompetenciaService } from '../services/competencia.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.less']
})
export class ListSkillsComponent implements  AfterViewInit, OnInit {

  competencias: Competencia[] = [];
  showInactivos = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'COMPETENCIA', 'FECHA INICIO', 'ESTADO', 'ACCIONES'];
  dataSource = new MatTableDataSource<Competencia>([]);

  constructor(
    private router: Router,
    private dataservice: DataService<any>,
    private competenciaService: CompetenciaService,
  ) { }

  ngOnInit() {
    this.listarCompetencias("VIGENTE");
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

  listarCompetencias(estado: string): void {
    this.competenciaService.listarCompetencias(estado).subscribe({
      next: (data) =>{
        this.competencias = data;
        this.dataSource = new MatTableDataSource(this.competencias);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>{
        console.log("ERROR EN LISTAR: ", error)
      }
    })

  }

  mostrarInactivos(){
    if (this.showInactivos) {
      this.listarCompetencias("VIGENTE")
    } else {
      this.listarCompetencias("TERMINADO")
    }
  }

  editarCompetencia(fila: any){

  }

  eliminarCompetencia(fila: any){

  }

  detalleCompetencia(fila: any){
    
  }
}
