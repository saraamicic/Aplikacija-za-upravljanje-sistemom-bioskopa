import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private httpClient: HttpClient) { }

  public getAllFilms(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/films");
  }

  public createFilm(film:Film):Observable<any> 
  {
    return this.httpClient.post("http://localhost:8080/films", film);

  }

  public updateFilm(id:number, film:Film): Observable<any>
  {
    //kada imamo query paramtere treba nam `
    return this.httpClient.put(`http://localhost:8080/films?id=${id}`, film);

  }
  public deleteFilm(id:number):Observable<any>
  {
      return this.httpClient.delete(`http://localhost:8080/films?id=${id}`);

  }
  
}