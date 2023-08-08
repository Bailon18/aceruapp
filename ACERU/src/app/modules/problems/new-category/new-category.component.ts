import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.less']
})
export class NewCategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private serviceNavigation: NavigationService, private formBuilder: FormBuilder,private toster:ToastrService) { }

  ngOnInit() {
    this.setForm()
  }
  setForm()
  {
this.form=this.formBuilder.group({
  name:[],
  description:[],
  image:[],

})
  }
  redirect(page:string, parameter?:any)
  {
    this.serviceNavigation.redirect(page,parameter)
  }
  saveCategory()
  {
    if(this.form.valid)
    {
      this.toster.success("Categoria creada")
    }

  }
}
