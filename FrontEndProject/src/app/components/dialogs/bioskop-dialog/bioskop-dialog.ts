import { Component, Inject } from '@angular/core';
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
import { BioskopService } from '../../../services/bioskop';
import { Bioskop } from '../../../models/bioskop';

@Component({
  selector: 'app-bioskop-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './bioskop-dialog.html',
  styleUrl: './bioskop-dialog.css',
})
export class BioskopDialog {

  flag!:number; //flag nam je property tipa number

  //treba nam konst jer cemo injektovati stvari u komponentu
  constructor (
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BioskopDialog>,
    private service: BioskopService, //da mozemo da pozivamo metode
    @Inject(MAT_DIALOG_DATA) public data:Bioskop //podaci koji nam dolaze iz tabele 
  ){}

  public add(){
    //prosledjujemo data koji smo injektovali
    this.service.createBioskop(this.data).subscribe(
      {next:(data)=>{ //ako je uspesno
        this.dialogRef.close(1); //gotovo pa treba da se zatvori dijalog
        this.matSnackBar.open(`Bioskop with naziv: ${data.naziv} has been successfully created`, `Okay`, {duration:2500}) //tilda jer ubacujemo promenljive
      },
      error: (err)=>{ //ako je error
        this.matSnackBar.open(`There has been an error with POST request`, `Okay`, 
          {duration:2500});
          console.log(err); 
      }}
    )
  };
  public update(){
    this.service.updateBioskop(this.data.id, this.data).subscribe(
    {
      next: (data)=> {
        this.dialogRef.close(1);
        this.matSnackBar.open(`Artikl with an ID: ${data.id} has been successfully updated`, `Okay`, {duration:2500})
      },
      error: (err)=> {
        this.matSnackBar.open(`There has been an error with PUT request`, `Okay`,{duration:2500});
        console.log(err);
      }
    }
  )
  };
  public delete(){

    this.service.deleteBioskop(this.data.id).subscribe(
    {
      next: (data)=> {
        this.dialogRef.close(1);
        this.matSnackBar.open(`Artikl with an ID: ${this.data.id} has been successfully deleted`, `Okay`, {duration:2500})
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



}
