import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CompetenciaService } from '../services/competencia.service';
import { Competencia } from '../model/competencia';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.less']
})
export class NewSkillComponent implements OnInit {
  
  titulo: string = 'Nueva competencia';
  nombreBoton: string = 'Crear';
  idCompetencia: any;
  dataCompetencia: any;

  public competenciaForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    estado:['VIGENTE']
  });

  constructor(
    private fb: FormBuilder,
    private competenciaService: CompetenciaService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCompetencia = parseInt(params.id);

      console.log("ID: ", this.idCompetencia)

      if(!isNaN(this.idCompetencia)){
        this.titulo = 'Editar competencia';
        this.nombreBoton = 'Actualizar';

        this.competenciaService.buscarCompetenciaPorId(this.idCompetencia).subscribe({
          next:(data) => {
            this.dataCompetencia = data; // porque no guarda los datos en dataMaterial

            this.competenciaForm.controls['id'].setValue(data.id);
            this.competenciaForm.controls['nombre'].setValue(data.nombre);
            this.competenciaForm.controls['descripcion'].setValue(data.descripcion);
            this.competenciaForm.controls['fechaInicio'].setValue(data.fechaInicio);
            this.competenciaForm.controls['fechaFinal'].setValue(data.fechaFinal);
            this.competenciaForm.controls['estado'].setValue(data.estado);
         
          },
          error:(error) => {
          }
        })

      }else{
        this.competenciaForm.get('fechaFinal')?.disable();
      }
    });
  }

 
  isValidField(field: string): boolean | null {
    return (
      this.competenciaForm.controls[field].errors &&
      this.competenciaForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.competenciaForm.controls[field]) return null;

    const errors = this.competenciaForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }
    return null;
  }

  onFechaInicioChange() {
    const fechaInicio = this.competenciaForm.get('fechaInicio');
    const fechaFinal = this.competenciaForm.get('fechaFinal');

    if (fechaInicio?.valid && fechaInicio?.value !== '') {
      fechaFinal?.enable();
    } else {
      fechaFinal?.disable();
    }
  }

  guardarCompetencia(){

    if(this.competenciaForm.valid){

      const nuevaCompetencia: Competencia = this.competenciaForm.value;

      let mensaje = "Competencia creada con exito!"

      if(this.competenciaForm.value.id != ''){

        mensaje = "Competencia actualizado con exito!"
      }
  
      this.competenciaService.crearCompetencia(nuevaCompetencia).subscribe({
        next: () => {
          this.toaster.success(mensaje);
          this.retornar()
        },
        error:(error) => {
          this.toaster.error('No se pudo realizar la operacion');
        }
      });
    }
  }

  retornar(){
    this.router.navigate(['/skills'])
  }
  

}
