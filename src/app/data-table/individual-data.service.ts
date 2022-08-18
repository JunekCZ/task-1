import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface iPlayer {
  team: string,
  player: string,
  toi: number,
  gp: number,
  xg60: number,
  c60: number,
  sogc_pct: number
}

export class Player implements iPlayer {
  team: string;
  player: string;
  toi: number;
  gp: number;
  xg60: number;
  c60: number;
  sogc_pct: number;

  constructor(team: string, player: string, toi: number, gp: number, xg60: number, c60: number, sogc_pct: number) {
    this.team = team;
    this.player = player;
    this.toi = toi;
    this.gp = gp;
    this.xg60 = xg60;
    this.c60 = c60;
    this.sogc_pct = sogc_pct;
  }
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