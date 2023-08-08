import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup=new FormGroup({});

  constructor(private formBuilder: FormBuilder, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contrasenaActual: [''],
      newContrasena: [''],
      newContrasena2:[""],
    });
  }
  changePassword()
  {
if(this.form.valid)
this.toaster.success('El cambio de contraseña fue exitoso')

  }
}
