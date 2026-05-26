import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-rezervacija',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, DatePipe],
  templateUrl: './rezervacija.html',
  styleUrl: './rezervacija.css',
})
export class RezervacijaComponent implements OnInit, OnChanges{

  displayedColumns = ['id', 'brojOsoba', 'cenaKarte','datum', 'placeno' , 'sala', 'film', 'actions'];
  dataSource !: MatTableDataSource<Rezervacija>;

  parentsSelectedSala!: Sala;

  constructor(private service: RezervacijaService,
  private dialog: MatDialog 
  ) { this.loadData()}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  @Input() childSelectedSala!: Sala;

  ngOnInit():void {
    this.loadData();
  }

   public loadData(): void { 
    this.service.getRezervacijaBySala(this.childSelectedSala.id).subscribe(
      {next: (data) => this.dataSource = new MatTableDataSource<Rezervacija>(data), 
      error: (err) => console.log(err)}
    )

  }
  public openDialog(flag: number, id?: number, brojOsoba?: number, cenaKarte?: number,datum?:Date, 
    placeno?:boolean , sala?: Sala, film?:Film): void {
    let dialogData;
    if (flag === 1) {
      dialogData = { 
        id: 0, 
        kapacitet: null, 
        brojRedova: null, 
        bioskop: { id: null, naziv: '' }
      };
    } else { 
      dialogData = { id, brojOsoba, cenaKarte, datum, placeno, sala, film }; 
    }

    const ref = this.dialog.open(RezervacijaDialog, {
      data: dialogData
    });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe((response) => {
      if (response === 1) {
        this.loadData();
      }
    });
  }

}


