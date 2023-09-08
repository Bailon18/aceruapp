import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MaterialService } from '../services/material.service';
//import * as mammoth from 'mammoth';

@Component({
  selector: 'app-material-presentation',
  templateUrl: './material-presentation.component.html',
  styleUrls: ['./material-presentation.component.less']
})
export class MaterialPresentationComponent implements OnInit {
  
  data: any = {};
  idCategoria?: any;
  nombreCategoria?: string;
  resourceUrl: SafeResourceUrl | null = null; 


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService<any>,
    private sanitizer: DomSanitizer,
    private materialService: MaterialService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategoria = params.idMaterial;
      console.log("ID: ", this.idCategoria);
      this.materialService.getMaterialById(this.idCategoria).subscribe({
        next:(response) => {
          this.data = response;
          this.resourceUrl = this.getSafeResourceUrl(this.data.archivoBase64, this.data.tipoMaterial);
        },
        error:(error) => {
          console.error(error);
        }
      }
      );
    });
  }

  getSafeResourceUrl(archivoBase64: string, tipoMaterial: string): SafeResourceUrl {
    let url = '';
    if (tipoMaterial === 'PDF') {
      url = `data:application/pdf;base64,${archivoBase64}`;
    } else if (tipoMaterial === 'VIDEO') {
      url = `data:video/mp4;base64,${archivoBase64}`;
    } else if (tipoMaterial === 'WORD') {
      url = `data:application/msword;base64,${archivoBase64}`;
    } else if (tipoMaterial === 'TXT') {
      url = `data:text/plain;base64,${archivoBase64}`;
    } else if (tipoMaterial === 'PPT') {
      url = `data:application/vnd.ms-powerpoint;base64,${archivoBase64}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  clearSearch() {}

  redirect(page: string, parameter?: any) {}

  download() {}
}
