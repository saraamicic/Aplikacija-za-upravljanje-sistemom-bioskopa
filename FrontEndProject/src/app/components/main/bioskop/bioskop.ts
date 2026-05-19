import { Component, OnInit } from '@angular/core';
import { BioskopService } from '../../../services/bioskop';
import { Bioskop } from '../../../models/bioskop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { BioskopDialog } from '../../dialogs/bioskop-dialog/bioskop-dialog';


@Component({
  selector: 'app-bioskop',
  imports: [MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './bioskop.html',
  styleUrl: './bioskop.css',
})
export class BioskopComponent implements OnInit{ //

  displayedColumns = ['id', 'naziv', 'adresa', 'actions'];
  dataSource !: MatTableDataSource<Bioskop>;

  constructor(private service: BioskopService,
  private dialog: MatDialog //omogucava pojavu prozora, u dijalogu smo samo def vrednosti koje ce se pojaviti vljd
  ) { this.loadData()}

  ngOnInit():void {
    //this.loadData();
  }


  public loadData(): void { //salje http zahtev b
    this.service.getAllBioskops().subscribe(
      {next: (data) => this.dataSource = new MatTableDataSource<Bioskop>(data), 
      error: (err) => console.log(err)}
    )

  }

  //opcioni parametri se pisu sa ?
  public openDialog(flag:number, id?:number, naziv?:string, adresa?:string):void { //referenca ukazuje na dialog koji se otvara
    const ref = this.dialog.open(BioskopDialog, 
    {data: {id, naziv, adresa}}); //ono sto mi prosledimo u data objektu, to se injektuje u dialog komponentu
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

