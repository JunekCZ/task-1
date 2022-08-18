import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface iIndividualStatistic {
  metricFilter: [{
    metric: string,
    value: number
  }],
  gameState: string,
  scoreState: string,
  place: string,
  opponentTeams: string,
  dateFrom: Date,
  dateTo: Date,
  timeFrom: number,
  timeTo: number,
  lastPlayedMatches: number,
  timeOnIce: number,
  afterEvent: [{
    event: string,
    length: number
  }]
}

@Injectable({
  providedIn: 'root'
})
export class IndividualDataService {

  constructor(private http: HttpClient) {
  }
  getIndividualData(): Observable<iIndividualStatistic[]> {
    let url: string = "http://logiq.statistics.datasport.cz/api/v1/individual/f7166ebc-82f8-4279-a0ff-6b56d65f8e13";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 8bda9a4f6490c8602322ad3d36305ce2103cb34b'
    });
    let options = { headers };
    return this.http.post<iIndividualStatistic[]>(url, null, options);
  }
}
