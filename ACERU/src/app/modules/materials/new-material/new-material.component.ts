import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.less']
})
export class NewMaterialComponent implements OnInit {
  tipoArchivo=['PDF','Excel', 'Diapositivas']
  idCategory:any
  form: FormGroup = new FormGroup({});

  constructor(private serviceNavigation: NavigationService, private route: ActivatedRoute, private formBuilder: FormBuilder,private toaster:ToastrService) { }

    ngOnInit() {
      this.route.paramMap.subscribe(({params}:any)=>this.idCategory=params.id)
      this.setForm()
    }
    setForm()
    {
  this.form=this.formBuilder.group({
    name:[],
    description:[],
    linkField:[],
    typeField:[],
    field:[],

  })
    }
    clearSearch()
    {

    }
    redirect(page:string, parameter?:any)
    {
      this.serviceNavigation.redirect(page+this.idCategory,parameter)
    }
    saveMaterial()
    {
      if (this.form.valid) {
        this.toaster.success("Se creo el nuevo material")
      }
    }
}
