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
  token: string = "";
  competition: string = "";
  private individualDataService: IndividualDataService;

  showTable: boolean = false;
  showErrorMessage: boolean = false;

  individualData: Player[] = [];
  checkboxes = [
    { id: 1, value: "xg60", isSelected: false },
    { id: 2, value: "c60", isSelected: false },
    { id: 3, value: "sogc_pct", isSelected: false }
  ];

  cols: string[] = ["Team", "Player", "toi", "gp"];
  colName: string = "";

  constructor(private _individualDataService: IndividualDataService) {
    this.individualDataService = _individualDataService;
    this.token = "8bda9a4f6490c8602322ad3d36305ce2103cb34b";
    this.competition = "f7166ebc-82f8-4279-a0ff-6b56d65f8e13";
  }

  ngOnInit(): void {
  }

  /**
   * Loads the data on the users interactions with checkboxes
   */
  loadData(): void {
    this.showErrorMessage = false;
    if(this.checkboxes.every(i => !i.isSelected)) {
      this.showErrorMessage = true;
      return;
    }
    this.showTable = true;
    this.individualData = [];
    this.cols = ["Team", "Player", "toi", "gp"];

    if(this.checkboxes[0].isSelected) this.cols.push("xg60");
    if(this.checkboxes[1].isSelected) this.cols.push("c60");
    if(this.checkboxes[2].isSelected) this.cols.push("sogc_pct");
  
    this.individualDataService.getIndividualData(
      this.token, this.competition, this.checkboxes[0].isSelected, this.checkboxes[1].isSelected, this.checkboxes[2].isSelected
    ).subscribe(data => {
      this.individualData = this.transformData(data);
    });
  }

  /**
   * Transforms data from type iIndividualStatistic into type iPlayer
   * Helps me to show all objects easily in the HTML
   * @param data: iIndividualStatistics
   * @returns array of iPlayer
   */
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

  /**
   * Computing time to minutes
   * @param time 
   * @returns computed time in minutes
   */
  calculateMinutes(time: number): string {
    return (time / 60).toFixed(0);
  }


  /**
   * Computing time to seconds
   * @param time 
   * @returns computed time in seconds
   */
  calculateSeconds(time: number): string {
    let seconds: number = ((time / 60) % 1) * 60;
    return seconds > 9 ? seconds.toFixed(0) : "0" + seconds.toFixed(0);
  }
}