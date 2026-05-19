import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bioskop } from '../models/bioskop';

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

  public createBioskop(bioskop:Bioskop):Observable<any> 
  {
    return this.httpClient.post("http://localhost:8080/bioskops", bioskop);

  }

  public updateBioskop(id:number, bioskop:Bioskop): Observable<any>
  {
    //kada imamo query paramtere treba nam `
    return this.httpClient.put(`http://localhost:8080/bioskops?id=${id}`, bioskop);

  }
  public deleteBioskop(id:number):Observable<any>
  {
      return this.httpClient.delete(`http://localhost:8080/bioskops?id=${id}`);

  }
  
}
