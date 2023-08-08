import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
})
export class GridComponent implements OnInit {

  @Input() data: any;
  actions = [
    { value: 'assets/images/crud/lapiz.png', event: 'edit' },
    { value: 'assets/images/crud/eliminar.png', event: 'delete' },
  ];

  @Output() eventEmmiter = new EventEmitter();
  
  constructor(private userService: UserService) {}

  ngOnInit() {}
  sendEvent(event: any) {
    this.eventEmmiter.emit(event);
  }
}
