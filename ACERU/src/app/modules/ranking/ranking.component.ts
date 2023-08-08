import { Component, OnInit } from '@angular/core';
import { RANKING } from 'src/app/shared/constants/constants-ranking';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less']
})
export class RankingComponent implements OnInit {
  exercises=RANKING
  constructor() { }

  ngOnInit() {
  }
  openConsol(event:any)
  {

  }
}
