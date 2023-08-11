import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from 'src/app/helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getListarCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${baseUrl}/categoria/lista`);
  }

  guardarCategoria(dato: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/categoria/nuevo`, dato);
  }

}
