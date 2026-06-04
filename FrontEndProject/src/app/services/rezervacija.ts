import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root',
})
export class RezervacijaService {

  constructor(private httpClient: HttpClient) { }

  public getAllRezervacijas(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/rezervacijas");
  }

  public getRezervacijaBySala(salaId:number):Observable<any>{
    return this.httpClient.get(`http://localhost:8080/rezervacijas/sala?salaId=${salaId}`);
  }

  public createRezervacija(rezervacija:Rezervacija):Observable<any> 
  {
    return this.httpClient.post("http://localhost:8080/rezervacijas", rezervacija);

  }

  public updateRezervacija(id:number, rezervacija:Rezervacija): Observable<any>
  {
    //kada imamo query paramtere treba nam `
    return this.httpClient.put(`http://localhost:8080/rezervacijas?id=${id}`, rezervacija);

  }
  public deleteRezervacija(id:number):Observable<any>
  {
      return this.httpClient.delete(`http://localhost:8080/rezervacijas?id=${id}`);

  }
  
}
