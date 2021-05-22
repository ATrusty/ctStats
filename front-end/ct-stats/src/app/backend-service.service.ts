import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  backendUrl: string;

  constructor(private httpClient: HttpClient) {
    this.backendUrl = "http://localhost:8080"
  }

  getIndivStats(gt) {
      return this.httpClient.get(this.backendUrl + "/squadStatsIndiv?gt=Cragle 3");
  }

  getAggStats() {
    return this.httpClient.get(this.backendUrl + "/squadStats");
  }

  
}
