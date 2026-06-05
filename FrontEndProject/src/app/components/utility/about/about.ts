import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BioskopService } from '../../../services/bioskop';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatIcon],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  bioskopi: any[] = [];
  loading = true;

  lokalniPodaci = [
    { slika: 'bioskopi/ArenaCineplex.jpeg', telefon: '021/123-456' },
    { slika: 'bioskopi/cinegrad.jpeg', telefon: '011/987-654' },
    { slika: 'bioskopi/cineplexxgalerija.jpg', telefon: '011/555-333' },
    { slika: 'bioskopi/cineplexxnovisa.jpg', telefon: '021/444-222' },
    { slika: 'bioskopi/CineStar4DX.jpg', telefon: '011/111-999' },
    { slika: 'bioskopi/CinestarNS.jpg', telefon: '021/444-222' },
    { slika: 'bioskopi/kcbioskop.jpg', telefon: '021/111-999' }
  ];

  constructor(private bioskopService: BioskopService) {}

  ngOnInit(): void {
    this.bioskopService.getAllBioskops().subscribe({
      next: (data: any[]) => {
        this.bioskopi = data.map((bioskop, index) => {
          return {
            ...bioskop,
            slika: this.lokalniPodaci[index]?.slika,
            telefon: this.lokalniPodaci[index]?.telefon
          };
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}