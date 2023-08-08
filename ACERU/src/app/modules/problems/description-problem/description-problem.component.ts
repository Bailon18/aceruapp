import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CodeWindowComponent } from 'src/app/shared/components/code-window/code-window.component';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { EXERCISES } from 'src/app/shared/constants/constants-submissions';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-description-problem',
  templateUrl: './description-problem.component.html',
  styleUrls: ['./description-problem.component.less']
})
export class DescriptionProblemComponent implements OnInit {
  @Input() data={input:"Inicia con la impresión más conocida en el mundo de la programación. No se requiere entrada especifica",
  output:"Imprime ¡Hola, Mundo! En la salida estándar",
description:"Es el primer desafío, para ayudar a familiarizarse con la impresión y su funcionamiento. Es tu primer código, resuélvelo antes de seguir con el resto de los desafíos.Demuestre el “¡Hola, Mundo!” en tu pantalla",
inputExample:"",
outputExample:"!Hola mundo¡",
name:"Hola Mundo"
}
  faSearch = faSearch;
  faTimes = faTimes;
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
  openConsol(event=EXERCISES.data[0])
  {
    console.log(event);
   let headers=EXERCISES.headers.filter(header=>header.accesor!=="accion")
   let dialog= this.serviceDialog.openNewDialog(CodeWindowComponent,{itemSelected:event,headers},{})

  }
}
