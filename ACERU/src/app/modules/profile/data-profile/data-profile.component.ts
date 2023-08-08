import { Component, OnInit } from '@angular/core';
import { ROLES } from 'src/app/shared/constants/constants-auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styleUrls: ['./data-profile.component.less']
})
export class DataProfileComponent implements OnInit {
  roles = ROLES
  constructor(private formBuilder:FormBuilder,private serviceuser:UserService) { }
  form: FormGroup = new FormGroup({})
  ngOnInit() {
    this.setForm();
    this.form.setValue({
      nombre:this.serviceuser.getRegisterUserLogged()?.nombre,
      usuario:this.serviceuser.getRegisterUserLogged()?.email,
      rol:this.serviceuser.getRegisterUserLogged()?.rol,})
  }
  setForm() {
      this.form=this.formBuilder.group({
        nombre:[""],
        usuario:[""],
        rol:[""]

      })
  }
}
