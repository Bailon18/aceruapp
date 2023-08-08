import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.less']
})
export class NewCategoryComponent implements OnInit {

  idCategory: any
  form: FormGroup = new FormGroup({});

  constructor(private serviceNavigation: NavigationService, private formBuilder: FormBuilder,private toaster:ToastrService) { }
  ngOnInit() {
    this.setForm()
  }
  setForm() {
    this.form = this.formBuilder.group({
      name: [],
      description: [],
      image: [],
    })
  }
  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter)
  }
  saveCategory() {
    if (this.form.valid) {
      this.toaster.success("Se creo la nueva categoria")

    }
  }
}
