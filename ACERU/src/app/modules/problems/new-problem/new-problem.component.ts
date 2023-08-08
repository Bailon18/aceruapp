import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.less']
})
export class NewProblemComponent implements OnInit {
  dificultad = ['Fácil', 'Intermedio', 'Dificil']
  idCategory: any
  form: FormGroup = new FormGroup({});

  constructor(private serviceNavigation: NavigationService, private route: ActivatedRoute, private formBuilder: FormBuilder, private toaster: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => this.idCategory = params.id)
    this.setForm()
  }
  setForm() {
    this.form = this.formBuilder.group({
      name: [],
      description: [],
      input: [],
      output: [],
      exampleInput: [],
      exampleOutput: [],
      difficulty: [],
    })
  }
  clearSearch() {

  }
  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page + this.idCategory, parameter)
  }
  saveProblem() {
    if (this.form.valid) {
      this.toaster.success("Se creo nuevo problema")
    }
  }
}
