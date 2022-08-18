import { Component, OnInit } from '@angular/core';
import { IndividualDataService, iIndividualStatistic, iStat } from './individual-data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  individualData: iIndividualStatistic[] = [];

  constructor(private individualDataService: IndividualDataService) {
    let token: string = "8bda9a4f6490c8602322ad3d36305ce2103cb34b";
    let competition: string = "f7166ebc-82f8-4279-a0ff-6b56d65f8e13";
    individualDataService.getIndividualData(token, competition).subscribe(data => {
      this.individualData = data;
      console.log(this.individualData);
    });
  }

  ngOnInit(): void {
  }

  getPlayersToi(obj: iStat): string {
    return obj.toi.toString();
  }

  getPlayersGp(obj: iStat): string {
    return obj.gp.toString();
  }

  getPlayersC60(obj: iStat): string {
    return obj.c60.toString();
  }

  getPlayersXg60(obj: iStat): string {
    return obj.xg60.toString();
  }

  getPlayersSogc_pct(obj: iStat): string {
    return obj.sogc_pct.toString();
  }

}
