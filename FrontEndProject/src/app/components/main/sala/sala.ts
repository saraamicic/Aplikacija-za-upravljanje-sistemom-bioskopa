import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { Sala } from '../../../models/sala';
import { SalaService } from '../../../services/sala';
import { Bioskop } from '../../../models/bioskop';
import { SalaDialog } from '../../dialogs/sala-dialog/sala-dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RezervacijaComponent } from '../rezervacija/rezervacija';


@Component({
  selector: 'app-sala',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule, RezervacijaComponent],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class SalaComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'kapacitet', 'brojRedova', 'bioskop', 'actions'];
  dataSource: MatTableDataSource<Sala> = new MatTableDataSource<Sala>([]);

  @ViewChild(MatSort) sort!: MatSort; //viewchild znaci izvlacimo iz htmla
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  parentSelectedSala!: Sala;

  constructor(private service: SalaService,
    private dialog: MatDialog
  ) { this.loadData() }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.service.getAllSalas().subscribe(
      {
        next: (data) => { this.dataSource.data = data },
        error: (err) => console.log(err)
      }
    )

  }

  public openDialog(flag: number, id?: number, kapacitet?: number, brojRedova?: number, bioskop?: Bioskop): void {
    const ref = this.dialog.open(SalaDialog, { data: { id, kapacitet, brojRedova, bioskop } });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
        if (response === 1) {
          this.loadData();
        }
      }
    )
  }

  public selectRow(row: Sala) {
    this.parentSelectedSala = row;
  }


}
