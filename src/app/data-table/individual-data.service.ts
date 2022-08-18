import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/*export interface iIndividualStatistic {
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
}*/

export interface iStat {
  toi: number,
  gp: number,
  xg60: number,
  c60: number,
  sogc_pct: number
}

export interface iIndividualStatistic {
  team: string,
  players: [{
    player: string,
    stats: iStat
  }]
}

@Injectable({
  providedIn: 'root'
})
export class IndividualDataService {

  constructor(private http: HttpClient) {
  }
  getIndividualData(token: string, competition: string): Observable<iIndividualStatistic[]> {
    let url: string = "http://logiq.statistics.datasport.cz/api/v1/individual/" + competition;
    var body = 
    {
      "gameState": "5:5",
      "timeOnIce": 600,
      "metrics": [
        "xg60",
        "c60",
        "sogc_pct"
      ]
    };
    
    console.log(JSON.stringify(body));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    let options = { headers };
    return this.http.post<iIndividualStatistic[]>(url, JSON.stringify(body), options);
  }
}
