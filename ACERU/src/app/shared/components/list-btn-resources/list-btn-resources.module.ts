import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBtnResourcesComponent } from './list-btn-resources.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListBtnResourcesComponent],
  exports:[ListBtnResourcesComponent]
})
export class ListBtnResourcesModule { }
