import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials.component';
import { MaterialsRoutingModule } from './materials-routing.module';
import { GridModule } from 'src/app/shared/components/grid/grid.module';
import { MaterialsCategoryComponent } from './materials-category/materials-category.component';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { MaterialPresentationComponent } from './material-presentation/material-presentation.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './new-category/new-category.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    GridModule,
    NgxDocViewerModule,
   ReactiveFormsModule
  ],
  declarations: [MaterialsComponent,MaterialsCategoryComponent,ListMaterialsComponent,NewMaterialComponent,MaterialPresentationComponent,NewCategoryComponent]
})
export class MaterialsModule { }
