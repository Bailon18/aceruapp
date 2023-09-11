import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper';
import { Usuario } from '../../auth/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  buscarUsuarioPorNombre(nombreUsuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/usuario/buscar/${nombreUsuario}`);
  }

}
