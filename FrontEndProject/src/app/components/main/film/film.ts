import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../services/film';
import { Film } from '../../../models/film';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { FilmDialog } from '../../dialogs/film-dialog/film-dialog';

@Component({
  selector: 'app-film',
  imports: [MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './film.html',
  styleUrl: './film.css',
})
export class FilmComponent implements OnInit {

  displayedColumns = ['id', 'naziv','zanr', 'trajanje', 'recenzija', 'actions'];
  dataSource !: MatTableDataSource<Film>;
  
  constructor(private service: FilmService,
  private dialog: MatDialog 
  ) { this.loadData()}
  
  ngOnInit():void {
    //this.loadData();
  }
  
  
  public loadData(): void { 
    this.service.getAllFilms().subscribe(
      {next: (data) => this.dataSource = new MatTableDataSource<Film>(data), 
      error: (err) => console.log(err)}
     )

  }
  
    //opcioni parametri se pisu sa ?
  public openDialog(flag:number, id?:number, naziv?:string, zanr?:string, trajanje?:number, recenzija?:number):void {
     const ref = this.dialog.open(FilmDialog, 
     {data: {id, naziv, zanr, trajanje, recenzija}}); 
     ref.componentInstance.flag = flag;
     ref.afterClosed().subscribe(
     (response)=> {
       if(response === 1){
        this.loadData();
       }

     }
     )
  }
  
  
}

