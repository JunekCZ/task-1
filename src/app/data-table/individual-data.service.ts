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
  getIndividualData(_token: string, _competition: string, _xg60: boolean, _c60: boolean, _sogc_pct: boolean): Observable<iIndividualStatistic[]> {
    let url: string = "http://logiq.statistics.datasport.cz/api/v1/individual/" + _competition;

    let metrics = [];
    if(_xg60) metrics.push("xg60")
    if(_c60) metrics.push("c60")
    if(_sogc_pct) metrics.push("sogc_pct")

    var body = {
      "gameState": "5:5",
      "timeOnIce": 600,
      "metrics": metrics
    };
    
    console.log(JSON.stringify(body));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + _token
    });
    let options = { headers };
    return this.http.post<iIndividualStatistic[]>(url, JSON.stringify(body), options);
  }
}