import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BioskopService {

  //u konstruktoru mozemo da injektujemo
  //tek kada prikazuejmo komponentu tek tada se njen konstruktor izvrsava
  constructor(private httpClient: HttpClient) { }

  public getAllBioskops(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/bioskops");
  }
}
