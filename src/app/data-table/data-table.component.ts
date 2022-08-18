import { Component, OnInit } from '@angular/core';
import { IndividualDataService, iIndividualStatistic } from './individual-data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor(private individualDataService: IndividualDataService) {
    individualDataService.getIndividualData().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {
  }

}
