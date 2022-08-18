import { Component, OnInit } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { SortPipe } from '../pipes/sort.pipe';
import { IndividualDataService, iIndividualStatistic, iStat, iPlayer, Player } from './individual-data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  individualData: Player[] = [];
  checkboxes = [
    { id: 1, value: "xg60", isSelected: false },
    { id: 2, value: "c60", isSelected: false },
    { id: 3, value: "sogc_pct", isSelected: false }
  ];

  cols: string[] = ["Team", "Player", "toi", "gp", "xg60", "c60", "sogc_pct"];
  colName: string = "";

  constructor(private individualDataService: IndividualDataService) {
    let token: string = "8bda9a4f6490c8602322ad3d36305ce2103cb34b";
    let competition: string = "f7166ebc-82f8-4279-a0ff-6b56d65f8e13";
    individualDataService.getIndividualData(token, competition).subscribe(data => {
      this.individualData = this.transformData(data);
      console.log(this.individualData);
    });
  }

  ngOnInit(): void {
  }

  loadData(): void {
  }

  transformData(data: iIndividualStatistic[]): iPlayer[] {
    let dataPlayers: iPlayer[] = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].players.length; j++) {
        let stats: iStat = data[i].players[j].stats;
        let player: Player = new Player(data[i].team, data[i].players[j].player, stats.toi, stats.gp, stats.xg60, stats.c60, stats.sogc_pct);
        dataPlayers.push(player);
      }
    }
    return dataPlayers;
  }

}
