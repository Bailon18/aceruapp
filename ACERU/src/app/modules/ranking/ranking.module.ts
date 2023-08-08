import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking.routing.module';
import { TableModule } from '../../shared/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    RankingRoutingModule,
    TableModule
  ],
  declarations: [RankingComponent]
})
export class RankingModule { }
