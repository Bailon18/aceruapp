import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer'



@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.less'],


})
export class NewMaterialComponent implements OnInit {

  name = 'Angular';
  pdfSrc='';
  form: FormGroup;
  tipoArchivo = ['Video', 'PDF', 'Word', 'TXT'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      description: '',
      linkField: '',
      typeField: '',
      field: null
    });
  }

  getFileAcceptValue(): string {
    const selectedType = this.form.get('typeField')?.value;

    switch (selectedType) {
      case 'Video':
        return 'video/*';
      case 'PDF':
        return 'application/pdf';
      case 'Word':
        return 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'TXT':
        return 'text/plain';
      default:
        return ''; // Por defecto, aceptar cualquier tipo
    }
  }


  ngOnInit(): void {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  onTypeChange(): void {
    const selectedType = this.form.get('typeField')?.value;

    // Aquí podrías realizar la lógica para mostrar u ocultar campos
  }

  saveMaterial(): void {
    // Aquí puedes implementar la lógica para guardar el material
  }

  redirect(route: string): void {
    // Aquí puedes implementar la lógica para redirigir
  }


  contentLoaded() {
    console.log('File loaded');
  }

  onFileChange(event: any): void {
    
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.pdfSrc = URL.createObjectURL(selectedFile);
    } else {
      this.pdfSrc = '';
    }
  }

}
