import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';


@Injectable({
  providedIn: 'root',
})
export class SalaService {

  //u konstruktoru mozemo da injektujemo
  //tek kada prikazuejmo komponentu tek tada se njen konstruktor izvrsava
  constructor(private httpClient: HttpClient) { }

  public getAllSalas(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/salas");
  }

  public createSala(sala:Sala):Observable<any> 
  {
    return this.httpClient.post("http://localhost:8080/salas", sala);

  }

  public updateSala(id:number, sala:Sala): Observable<any>
  {
    //kada imamo query paramtere treba nam `
    return this.httpClient.put(`http://localhost:8080/salas?id=${id}`, sala);

  }
  public deleteSala(id:number):Observable<any>
  {
      return this.httpClient.delete(`http://localhost:8080/salas?id=${id}`);

  }
  
}
