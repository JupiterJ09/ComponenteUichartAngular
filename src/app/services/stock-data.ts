import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockDataArray{

  date: string;
  open: number;
  high: number;
  low: number; 
  close: number;
  adjusted_close: number;
  volume: number;

}


@Injectable({
  providedIn: 'root'
})
export class StockData {

  private apiUrl = "https://eodhistoricaldata.com/api/eod/MCD.US?from=2017-01-05&to=2017-02-05&period=d&fmt=json&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX";
  
  constructor(private http: HttpClient){
  }

  readAcciones(): Observable<StockDataArray[]>{
    return this.http.get<StockDataArray[]>(this.apiUrl);
  }
}
