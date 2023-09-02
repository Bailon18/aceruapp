import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper';
import { Competencia } from '../model/competencia';



@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  constructor(private http: HttpClient) { }


  cambiarEstadoProblema(problemaId: number, estado: string): Observable<void> {
    const url = `${baseUrl}/problema/cambiarEstado/${problemaId}/${estado}`;
    return this.http.put<void>(url, null); 
  }


  listarCompetencias(estado: string): Observable<Competencia[]> {
    return this.http.get<Competencia[]>(`${baseUrl}/competencia/porEstado/${estado}`);
  }

  crearCompetencia(competencia: Competencia): Observable<Competencia> {
    return this.http.post<Competencia>(`${baseUrl}/crear`, competencia);
  }
}
