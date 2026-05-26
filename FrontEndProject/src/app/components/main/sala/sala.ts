import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { Sala } from '../../../models/sala';
import { SalaService } from '../../../services/sala';
import { Bioskop } from '../../../models/bioskop';
import { SalaDialog } from '../../dialogs/sala-dialog/sala-dialog';


@Component({
  selector: 'app-sala',
  imports: [MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class SalaComponent implements OnInit {

  displayedColumns = ['id', 'kapacitet', 'brojRedova', 'bioskop', 'actions'];
  dataSource !: MatTableDataSource<Sala>;

  parentsSelectedSala!: Sala;

  constructor(private service: SalaService,
  private dialog: MatDialog 
  ) { this.loadData()}

  ngOnInit():void {
    this.loadData();
  }

  public loadData(): void { 
    this.service.getAllSalas().subscribe(
      {next: (data) => this.dataSource = new MatTableDataSource<Sala>(data), 
      error: (err) => console.log(err)}
    )

  }

  public openDialog(flag: number, id?: number, kapacitet?: number, brojRedova?: number, bioskop?: Bioskop): void {
  let dialogData;
  if (flag === 1) { // rucno pravimo prazan objekat sa inicijalizovanim bioskopom
    dialogData = { 
      id: 0, 
      kapacitet: null, 
      brojRedova: null, 
      bioskop: { id: null, naziv: '' }
    };
  } else { // ako je izmena/broisanje prosledimo podatke
    dialogData = { id, kapacitet, brojRedova, bioskop }; //ostali 
  }

  const ref = this.dialog.open(SalaDialog, {
    data: dialogData
  });
  ref.componentInstance.flag = flag;
  ref.afterClosed().subscribe((response) => {
    if (response === 1) {
      this.loadData();
    }
  });
}

public selectRow(row:Sala){
  this.parentsSelectedSala = row;
}


}
