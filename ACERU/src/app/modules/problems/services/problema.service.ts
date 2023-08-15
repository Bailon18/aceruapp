import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from 'src/app/helper';
import { Problema } from '../model/problema';

@Injectable({
  providedIn: 'root'
})
export class ProblemaService {

  constructor(private http: HttpClient) { }

  getListarProblema(idCategoria: number, estado: string):Observable<Problema[]>{
    return this.http.get<Problema[]>(`${baseUrl}/problema/listar/${idCategoria}/${estado}`);
  }

  guardarProblema(problema: Problema): Observable<Problema> {
    return this.http.post(`${baseUrl}/problema/guardar`, problema);
  }

  // cambiarEstadoCategoria(categoriaId: number, estado: string): Observable<void> {
  //   const url = `${baseUrl}/categoria/cambiarEstado/${categoriaId}/${estado}`;
  //   return this.http.get<void>(url);
  // }

}
