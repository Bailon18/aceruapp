import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../services/material.service';
import { Material } from '../model/model';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.less'],
})
export class NewMaterialComponent implements OnInit {

  tipoArchivo = ['VIDEO', 'PDF', 'WORD', 'TXT', 'PPT'];
  isFileSelected = false;
  idCategoria: any;
  archivoSeleccionado: any;
  nombreCategoria: any;
  idmaterial: any;
  titulo:string = "Nuevo MaTerial";
  nombreBoton:string = "Crear"
  dataMaterial:any;
  material?:Material;

  constructor(
    private toster: ToastrService,
    private fb: FormBuilder,
    private materiaService: MaterialService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public naterialform = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    tipoMaterial: ['PDF', [Validators.required]],
    archivo: [null, [Validators.required]],
  });

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategoria = parseInt(params.id);
      this.nombreCategoria = params.nombre;

      this.idmaterial = params.idmaterial; // condicionamos si es editar o nuevo
      if(this.idmaterial != null){
        this.titulo = "Editar Material";
        this.nombreBoton = "Actualizar";

        this.materiaService.getMaterialById(this.idmaterial).subscribe({
          next:(data) => {
            this.dataMaterial = data; // porque no guarda los datos en dataMaterial

            this.naterialform.controls['id'].setValue(data.id);
            this.naterialform.controls['nombre'].setValue(data.nombre);
            this.naterialform.controls['descripcion'].setValue(data.descripcion);
            this.naterialform.controls['tipoMaterial'].setValue(data.tipoMaterial);
            this.naterialform.controls['archivo'].setErrors(null); 
            this.isFileSelected = true;

          },
          error:(error) => {
          }
        })
      }
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.naterialform.controls[field].errors &&
      this.naterialform.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.naterialform.controls[field]) return null;

    const errors = this.naterialform.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }
    return null;
  }

  getFileAcceptValue(): string {
    const selectedType = this.naterialform.get('tipoMaterial')?.value;

    switch (selectedType) {
      case 'VIDEO':
        return 'video/*';
      case 'PDF':
        return 'application/pdf';
      case 'WORD':
        return 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'TXT':
        return 'text/plain';
      case 'PPT': 
        return '.pptx';
      default:
        return '';
    }
  }

  saveMaterial(): void {
    if (this.naterialform.invalid) {
      return;
    }


    let mensaje = "Material creada exitosamente!"

    this.material = {
      id:undefined,
      nombre: this.naterialform.get('nombre')?.value,
      descripcion: this.naterialform.get('descripcion')?.value,
      tipoMaterial: this.naterialform.get('tipoMaterial')?.value,
      material: {
        id: this.idCategoria
      }
    };

    const formData = new FormData();
  
    if(this.idmaterial){
      mensaje = "Material actualizado exitosamente!"
      this.material.id = parseInt(this.idmaterial);
      if(this.archivoSeleccionado == null){
      }else{
        formData.append('archivo', this.archivoSeleccionado);
      }
 
    }else{
      formData.append('archivo', this.archivoSeleccionado);
    }
    
    formData.append('material', new Blob([JSON.stringify(this.material)], { type: 'application/json' }));

    this.materiaService.createMaterial(formData).subscribe({
      next: (resp) => {
        this.toster.success(mensaje);
        this.redirect();
      },
      error: (error) => {
        this.toster.error('Error al realizar accion en material');
      }
    });
  }

  redirect(): void {
    this.router.navigate(['materials/category/' + this.idCategoria + '/' + this.nombreCategoria]);
  }

  onFileChange(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.isFileSelected = true;
      this.archivoSeleccionado = selectedFile;
      this.toster.info('Archivo seleccionado: ' + selectedFile.name);
    } else {
      this.isFileSelected = false;
    }
  }

}
