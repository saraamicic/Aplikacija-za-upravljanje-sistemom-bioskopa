import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RezervacijaService } from '../../../services/rezervacija';
import { Rezervacija } from '../../../models/rezervacija';
import { SalaService } from '../../../services/sala';
import { FilmService } from '../../../services/film';
import { Sala } from '../../../models/sala';
import { Film } from '../../../models/film';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-rezervacija-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, 
    MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './rezervacija-dialog.html',
  styleUrl: './rezervacija-dialog.css',
})
export class RezervacijaDialog implements OnInit {
  flag!:number; 
  sale!: Sala[];
  filmovi!: Film[];

  //treba nam konst jer cemo injektovati stvari u komponentu
  constructor (
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RezervacijaDialog>,
    private service: RezervacijaService,
    @Inject(MAT_DIALOG_DATA) public data:Rezervacija,
    private salaService: SalaService,
    private filmService: FilmService
  ){}

  ngOnInit():void{
    this.salaService.getAllSalas().subscribe(
      (data)=> this.sale = data,
    )
      this.filmService.getAllFilms().subscribe(
      (data)=> this.filmovi = data,
    )
  }

  public add(){
    //prosledjujemo data koji smo injektovali
    this.service.createRezervacija(this.data).subscribe(
      {next:(data)=>{ //ako je uspesno
        this.dialogRef.close(1); //gotovo pa treba da se zatvori dijalog
        this.matSnackBar.open(`Rezervacija with id: ${data.id} has been successfully created`, `Okay`, {duration:2500}) //tilda jer ubacujemo promenljive
      },
      error: (err)=>{ //ako je error
        this.matSnackBar.open(`There has been an error with POST request`, `Okay`, 
          {duration:2500});
          console.log(err); 
      }}
    )
  };
  public update(){
    this.service.updateRezervacija(this.data.id, this.data).subscribe(
    {
      next: (data)=> {
        this.dialogRef.close(1);
        this.matSnackBar.open(`Rezervacija with an ID: ${data.id} has been successfully updated`, `Okay`, {duration:2500})
      },
      error: (err)=> {
        this.matSnackBar.open(`There has been an error with PUT request`, `Okay`,{duration:2500});
        console.log(err);
      }
    }
  )
  };
  public delete(){

    this.service.deleteRezervacija(this.data.id).subscribe(
    {
      next: (data)=> {
        this.dialogRef.close(1);
        this.matSnackBar.open(`Rezervacija with an ID: ${this.data.id} has been successfully deleted`, `Okay`, {duration:2500})
      },
      error: (err)=> {
        this.matSnackBar.open(`There has been an error with DELETE request`, `Okay`,{duration:2500});
        console.log(err);
      }
    }
  )

  };
  public cancel(){
    this.dialogRef.close();
    this.matSnackBar.open(`Youve given up on changes!`, `Okay`, {duration:2500});
  };

  public compare(a:any, b:any){
    return a.id==b.id; //vraca boolean poredjenja dva ida
  }




}
