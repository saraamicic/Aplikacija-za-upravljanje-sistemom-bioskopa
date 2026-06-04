import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FilmService } from '../../../services/film';
import { Film } from '../../../models/film';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { FilmDialog } from '../../dialogs/film-dialog/film-dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-film',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule],
  templateUrl: './film.html',
  styleUrl: './film.css',
})
export class FilmComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'naziv','zanr', 'trajanje', 'recenzija', 'actions'];
  dataSource : MatTableDataSource<Film> = new MatTableDataSource<Film>([]);

  @ViewChild(MatSort) sort!:MatSort; //viewchild znaci izvlacimo iz htmla
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  constructor(private service: FilmService,
  private dialog: MatDialog 
  ) { this.loadData()}
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void {
    this.loadData();
  }
  
  
  public loadData(): void { 
    this.service.getAllFilms().subscribe(
      {next: (data) => {this.dataSource.data=data}, 
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

