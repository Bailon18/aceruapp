
import { Component, OnInit } from '@angular/core';
import { ROLES } from 'src/app/shared/constants/constants-auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TokenService } from '../../auth/services/token.service';
import { PerfilService } from '../service/perfil.service';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styleUrls: ['./data-profile.component.less'],
})
export class DataProfileComponent implements OnInit {
  
  roles = ROLES;
  rolesDisponibles = ['Administrador', 'Participante'];
  

  public perfilForm = this.fb.group({
    id: '',
    nombre: ['', [Validators.required]],
    nick: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private serviceuser: UserService,
    private autoservice: TokenService,
    private perfilService: PerfilService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
  
    const userName = this.autoservice.getUserName();
    const rolNombre =  this.autoservice.getAuthorities()[0] !== 'ROLE_ADMIN'? 'user':'admin';

    if(userName){
      this.perfilService.buscarUsuarioPorNombre(userName).subscribe({
        next: (respuesta) =>{
          this.perfilForm = this.fb.group({
            id: [respuesta.id],
            nombre: [respuesta.nombre],
            nick: [respuesta.nombreUsuario],
            email: [respuesta.email],
            rol: [{ value: rolNombre, disabled: rolNombre !== 'admin' }]
          });
        },
        error:(error) => {
    
        }
      })
    }

  }

  isValidField(field: string): boolean | null {
    return this.perfilForm.controls[field].errors
      && this.perfilForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.perfilForm.controls[field]) return null;

    const errors = this.perfilForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;

        case 'minlength':
          return `El campo ${field} debe tener al menos mínimo ${errors['minlength'].requiredLength} caracters.`;

        case 'email':
          return `El campo ${field} debe ser un correo válido.`;

        case 'invalidEmail':
          return `El campo ${field} ya se encuentra registrado.`;
      }
    }

    return null;
  }

  isValidadEmail(event: any) {

    if (this.perfilForm.controls['email'].valid){

      const email = (event.target as HTMLInputElement).value;

      this.authService.getValidarCorreo(email).subscribe(res => {
        if(res){
          this.perfilForm.controls['email'].setErrors({ invalidEmail: '' });
        }else{
          this.perfilForm.controls['email'].setErrors(null);
        }
      });
    }
  }


}
