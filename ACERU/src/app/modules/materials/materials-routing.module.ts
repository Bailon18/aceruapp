import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { MaterialsCategoryComponent } from './materials-category/materials-category.component';
import { MaterialsComponent } from './materials.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { MaterialPresentationComponent } from './material-presentation/material-presentation.component';
import { RoleGuardService } from 'src/app/shared/services/guard/role-guard/roleGuard.service';

const routes: Routes = [
  {
    path: '',
    component: MaterialsComponent,
    children: [
      { path: '', component: MaterialsCategoryComponent },
      { path: 'category/:id/', component: ListMaterialsComponent },
      {
        path: 'new-category',
        // canActivate: [RoleGuardService],
        // data: { rol: 'Administrador' },
        component: NewCategoryComponent,
      },
      {
        path: 'category/:id/new-material',
        // canActivate: [RoleGuardService],
        // data: { rol: 'Administrador' },
        component: NewMaterialComponent,
      },
      {
        path: 'category/presentation-material/:idCategory/:idMaterial',
        component: MaterialPresentationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsRoutingModule {}
