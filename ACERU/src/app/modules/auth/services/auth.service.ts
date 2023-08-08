import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import baseUrl from 'src/app/helper';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }


  // metodo para ingresar un registrar un usuario
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/auth/nuevo` ,nuevoUsuario);
  }

  // metodo para logearse
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(`${baseUrl}/auth/login`, loginUsuario);
  }

  // validar existencia de correo
  getValidarCorreo(correo: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${baseUrl}/auth/existEmail/${correo}`);
  }


}
