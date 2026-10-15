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
import { MatSelectModule } from '@angular/material/select';
import { SalaService } from '../../../services/sala';
import { Sala } from '../../../models/sala';
import { Bioskop } from '../../../models/bioskop';
import { BioskopService } from '../../../services/bioskop';

@Component({
  selector: 'app-sala-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, MatSelectModule],
  templateUrl: './sala-dialog.html',
  styleUrl: './sala-dialog.css',
})
export class SalaDialog implements OnInit{

    flag!:number;
    bioskopi!: Bioskop[]
  
    constructor (
      private matSnackBar: MatSnackBar,
      private dialogRef: MatDialogRef<SalaDialog>,
      private service: SalaService, 
      @Inject(MAT_DIALOG_DATA) public data:Sala,
      private bioskopService: BioskopService //injektujemo bioskopservice
    ){}

    //trebaju nam bioskopi jer su fk
    ngOnInit(): void {
      this.bioskopService.getAllBioskops().subscribe(
        (data)=> this.bioskopi = data,
    )
  }
  
    public add(){
      this.service.createSala(this.data).subscribe(
        {next:(data)=>{ 
          this.dialogRef.close(1); 
          this.matSnackBar.open(`Sala with kapacitet: ${data.kapacitet} has been successfully created`, `Okay`, {duration:2500}) //tilda jer ubacujemo promenljive
        },
        error: (err)=>{ //ako je error
          this.matSnackBar.open(`There has been an error with POST request`, `Okay`, 
            {duration:2500});
            console.log(err); 
        }}
      )
    };
    public update(){
      this.service.updateSala(this.data.id, this.data).subscribe(
      {
        next: (data)=> {
          this.dialogRef.close(1);
          this.matSnackBar.open(`Sala with an ID: ${data.id} has been successfully updated`, `Okay`, {duration:2500})
        },
        error: (err)=> {
          this.matSnackBar.open(`There has been an error with PUT request`, `Okay`,{duration:2500});
          console.log(err);
        }
      }
    )
    };
    public delete(){
  
      this.service.deleteSala(this.data.id).subscribe(
      {
        next: (data)=> {
          this.dialogRef.close(1);
          this.matSnackBar.open(`Sala with an ID: ${this.data.id} has been successfully deleted`, `Okay`, {duration:2500})
        },
        error: (err)=> {
          this.matSnackBar.open(`There has been an error with DELETE request`, `Okay`,{duration:2500});
          console.log(err);
        }
      })
  
    };
    public cancel(){
      this.dialogRef.close();
      this.matSnackBar.open(`Youve given up on changes!`, `Okay`, {duration:2500});
    };

    public compare(a:any, b:any){
      return a.id==b.id; //vraca boolean poredjenja dva ida
    }

  
  
  


}
