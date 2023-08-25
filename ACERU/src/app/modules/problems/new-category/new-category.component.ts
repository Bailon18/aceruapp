import { CategoriaService } from './../services/categoria.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Categoria } from '../model/categoria';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.less'],
})
export class NewCategoryComponent implements OnInit {


  @ViewChild('imagenInputFile', { static: false }) imagenInputFile?: ElementRef;

  nombreboton:string ="Crear"
  titulo:string="Nueva Categoría de Problemas"
  nuevaCategoria?: Categoria;
  datocategoria?: any;

  constructor(
    private serviceNavigation: NavigationService,
    private toster: ToastrService,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private dataService: DataService<any>
  ) { }


  public categoriaform = this.fb.group({
    id:[''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    imagenurl: [''],
    estado:['Activo']
  });


  ngOnInit() {

    this.datocategoria = this.dataService.getData();
    
    if( this.datocategoria != null){

      this.nombreboton = "Actualizar";
      this.titulo= "Editar Categoría de Problemas"

      this.categoriaform.controls['id'].setValue(this.datocategoria.id);
      this.categoriaform.controls['nombre'].setValue(this.datocategoria.nombre);
      this.categoriaform.controls['descripcion'].setValue(this.datocategoria.descripcion);
      this.categoriaform.controls['imagenurl'].setValue(this.datocategoria.imagenurl);
      this.categoriaform.controls['estado'].setValue(this.datocategoria.estado);


      const imagenPreview = document.getElementById('imagenPreview') as HTMLImageElement;
      imagenPreview.style.display = 'block';
      imagenPreview.src = this.datocategoria.imagenurl;


    }

  }

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }

  isValidField(field: string): boolean | null {
    return (
      this.categoriaform.controls[field].errors &&
      this.categoriaform.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.categoriaform.controls[field]) return null;

    const errors = this.categoriaform.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }

    return null;
  }

  mostrarVistaPrevia(): void {
    const input = this.imagenInputFile?.nativeElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagenPreview = document.getElementById('imagenPreview') as HTMLImageElement;
        imagenPreview.src = e.target.result;
        imagenPreview.style.display = 'block';

      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  saveCategory() {

    if(this.categoriaform.valid){

      let mensaje = "Categoria creada con exito!"

      const formData = new FormData();

      const imagen = this.imagenInputFile?.nativeElement.files[0];

      this.nuevaCategoria = {
        nombre: this.categoriaform.value.nombre,
        descripcion: this.categoriaform.value.descripcion,
        imagen: null,
        estado: this.categoriaform.value.estado,
      };


      if( this.datocategoria != null){
        // acctualizado
        mensaje = "Categoria actualizado correctamente!"
        this.nuevaCategoria.id = this.datocategoria.id;
      }

      formData.append(
        'categoria',
        new Blob([JSON.stringify(this.nuevaCategoria)], { type: 'application/json' }));

      formData.append('imagen', imagen);

      console.log("DATA ",this.nuevaCategoria )

      this.categoriaService.guardarCategoria(formData).subscribe({
        next: () => {
          this.mostrarmensaje(mensaje, "Categoria", "success");
          this.redirect('/problems');
        },
        error: (err) => {
          this.toster.error('Error al crear la categoría: ' + err.error.mensaje);
          this.mostrarmensaje("Error en la acción realizada", "Categoria", "error")
        },
      });

      }
    }

    mostrarmensaje(mensaje: string, titulo: string, tipo: string){

      if(tipo == "success"){
        this.toster.success(mensaje, titulo)
      }else{
        this.toster.error(mensaje, titulo)
      }
    }

    limpiardata(){
      this.redirect('/problems');
      this.dataService.clearData();
    }


}
