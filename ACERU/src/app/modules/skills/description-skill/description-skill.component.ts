import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-description-skill',
  templateUrl: './description-skill.component.html',
  styleUrls: ['./description-skill.component.less']
})
export class DescriptionSkillComponent implements OnInit {
  @Input() data={

description:"Es el primer desafío, para ayudar a familiarizarse con la impresión y su funcionamiento. Es tu primer código, resuélvelo antes de seguir con el resto de los desafíos.Demuestre el “¡Hola, Mundo!” en tu pantalla",
name:"Desarrollo de estructuras",
state:"Activa",
date:"26/11/22",
duration:"1:30:00 Min",
}

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
    this.serviceNavigation.redirect(page,parameter)
  }

}
