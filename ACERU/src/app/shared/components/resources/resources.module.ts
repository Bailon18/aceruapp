import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ResourcesComponent],
  exports:[ResourcesComponent]
})
export class ResourcesModule { }
