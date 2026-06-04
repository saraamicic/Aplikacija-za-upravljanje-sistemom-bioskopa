import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BioskopService } from '../../../services/bioskop';
import { Bioskop } from '../../../models/bioskop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { BioskopDialog } from '../../dialogs/bioskop-dialog/bioskop-dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-bioskop',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule],
  templateUrl: './bioskop.html',
  styleUrl: './bioskop.css',
})
export class BioskopComponent implements OnInit, AfterViewInit{

  displayedColumns = ['id', 'naziv', 'adresa', 'actions'];
  dataSource : MatTableDataSource<Bioskop> = new MatTableDataSource<Bioskop>([]);

  @ViewChild(MatSort) sort!:MatSort; //viewchild znaci izvlacimo iz htmla
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private service: BioskopService,
  private dialog: MatDialog //omogucava pojavu prozora, u dijalogu smo samo def vrednosti koje ce se pojaviti vljd
  ) { this.loadData()}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void {
    //this.loadData();
  }


  public loadData(): void { //salje http zahtev b
    this.service.getAllBioskops().subscribe(
      {next: (data) =>{this.dataSource.data=data} , 
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
      if(response){
        this.loadData();
      }

    }
    )
  }

}

