import { Component, OnInit } from '@angular/core';
import { BioskopService } from '../../../services/bioskop';
import { Bioskop } from '../../../models/bioskop';


@Component({
  selector: 'app-bioskop',
  imports: [],
  templateUrl: './bioskop.html',
  styleUrl: './bioskop.css',
})
export class BioskopComponent implements OnInit{ //

  bioskopi: Bioskop[] = []

  constructor(private service: BioskopService){}

  ngOnInit():void {
    this.service.getAllBioskops().subscribe(
      {next: (data) => this.bioskopi = data, 
      error: (err) => console.log(err)}
    )
  }

}

