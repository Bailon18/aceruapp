import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.less']
})
export class NewSkillComponent implements OnInit {
  
  form: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder,private serviceNavigation:NavigationService) { }
  ngOnInit() {
    this.setForm()
  }
  setForm() {
    this.form = this.formBuilder.group({
      name: [],
      description: [],
      dateInit: [],
      dateInitB: [],
      dateEnd: [],
      dateEndB: [],
      difficulty: [],
    })
  }
  redirect(page: string, parameter?: any) {
    console.log(page);

    this.serviceNavigation.redirect(page, parameter)
  }
}
