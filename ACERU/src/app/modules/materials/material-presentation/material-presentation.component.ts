import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-material-presentation',
  templateUrl: './material-presentation.component.html',
  styleUrls: ['./material-presentation.component.less']
})
export class MaterialPresentationComponent implements OnInit {

  @Input() data={title:"Fundamentos de programación", name:"Introducción a la programación", author:"Yuli Sinza & Stefania", fields:[{url:"",icon:"assets/images/materials/doc.png"},{url:"",icon:"assets/images/materials/pdf.png"},{url:"",icon:"assets/images/materials/powerpoint.png"}]}

  idCategory:any
  idProblem:any
  constructor(private serviceNavigation:NavigationService, private route:ActivatedRoute,private serviceDialog:DialogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(({params}:any)=>{
      this.idCategory=params.idCategory;
      this.idProblem=params.idProblem;
    })
  }
  clearSearch()
  {

  }
  redirect(page:string, parameter?:any)
  {
    this.serviceNavigation.redirect(page+this.idCategory,parameter)
  }
  download()
  {

  }
}
