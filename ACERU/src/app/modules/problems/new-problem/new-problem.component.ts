import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.less'],
})
export class NewProblemComponent implements OnInit {

  dificultad = ['Fácil', 'Intermedio', 'Dificil'];
  idCategory: any;
  nombreboton:string ="Crear"
  titulo:string="Nuevo Problema"

  public problemaForm  =  this.fb.group({
    id:[''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    ingreso: ['', [Validators.required]],
    salida: ['', [Validators.required]],
    ejemplo_ingreso: ['', [Validators.required]],
    ejemplo_salida: ['', [Validators.required]],
    dificultad: ['Facil', [Validators.required]],
  })

  constructor(
    private serviceNavigation: NavigationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    
    this.route.paramMap.subscribe(
      ({ params }: any) => (this.idCategory = params.id)
    );
   
  }

  isValidField(field: string): boolean | null {
    return (
      this.problemaForm.controls[field].errors &&
      this.problemaForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    
    if (!this.problemaForm.controls[field]) return null;

    const errors = this.problemaForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }

    return null;
  }
  

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page + this.idCategory, parameter);
  }

  saveProblem() {
    if (this.problemaForm.valid) {

      



      this.toaster.success('Se creo nuevo problema');
    }
  }

}
