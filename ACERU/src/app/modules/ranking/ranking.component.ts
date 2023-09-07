import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import swall from 'sweetalert2';
import { Usuario } from '../auth/models/usuario';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less']
})
export class RankingComponent implements AfterViewInit,OnInit {
  
  competencias: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'PARTICIPANTE', 'NICK', 'EMAIL', 'RANGO', 'ACCIONES'];
  dataSource = new MatTableDataSource<Usuario>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.listarUsuariosParticipantes();
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

  calificar(fila: any){

  }

  listarUsuariosParticipantes(){
    this.usuarioService.getListarUsuarioParticipantes().subscribe({
      next: (dato) =>{
        this.dataSource = new MatTableDataSource(dato)
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>{

      }
    })
  }

}
