import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { Sala } from '../../../models/sala';
import { RezervacijaService } from '../../../services/rezervacija';
import { Film } from '../../../models/film';
import { RezervacijaDialog } from '../../dialogs/rezervacija-dialog/rezervacija-dialog';
import { Rezervacija } from '../../../models/rezervacija';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-rezervacija',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, DatePipe, MatSortModule, MatPaginatorModule],
  templateUrl: './rezervacija.html',
  styleUrl: './rezervacija.css',
})
export class RezervacijaComponent implements OnInit, OnChanges, AfterViewInit{

  displayedColumns = ['id', 'brojOsoba', 'cenaKarte','datum', 'placeno' , 'sala', 'film', 'actions'];
  dataSource : MatTableDataSource<Rezervacija> = new MatTableDataSource<Rezervacija>([]);

  @ViewChild(MatSort) sort!:MatSort; //viewchild znaci izvlacimo iz htmla
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  @Input()
  childSelectedSala!:Sala;

  constructor(private service: RezervacijaService, private dialog:MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit():void {
    this.loadData();
  }

  public loadData(): void { 
    this.dataSource.data = [];
    this.service.getRezervacijaBySala(this.childSelectedSala.id).subscribe(
      {next: (data) => {this.dataSource.data=data}, 
      error: (err) => console.log(err)}
    )

  }


  public openDialog(flag:number, id?:number, brojOsoba?:number, cenaKarte?:number, datum?:Date, placeno?:boolean, film?:Film, sala?:Sala ):void{
    const ref = this.dialog.open(RezervacijaDialog, {data: {id, brojOsoba, cenaKarte, datum, placeno, film, sala}});
    ref.componentInstance.flag = flag;
    ref.componentInstance.data.sala = this.childSelectedSala;
    ref.afterClosed().subscribe(
      (response) => {
        if(response === 1){
          this.loadData();
        }
      }
    )
  }
    

}


