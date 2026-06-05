import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  loading = false;
  films: any[] = [
    {
    id: 1,
    naziv: 'Drama',
    zanr: 'Komedija',
    trajanje: 148,
    recenzija: 4.6,
    slika: 'filmovi/dramaposter.jpg',
    opis: 'Srećno vereni par sa nađe se iskušenju kada neočekivan obrt u potpunosti izmakne kontroli u nedelj uoči njihovog venčanja.'
    },
    {
      id: 2,
      naziv: 'Projekat očajnički pokušaj',
      zanr: 'Sci-Fi',
      trajanje: 156,
      recenzija: 4.9,
      slika: 'filmovi/projecthailmaryposter.jpg',
      opis: 'Profesor prirodnih nauka Rajlend Grejs (Ryan Gosling) budi se na svemirskom brodu, svetlosnim godinama udaljen od doma, bez ikakvog sećanja na to ko je i kako je tamo dospeo. Kako mu se pamćenje postepeno vraća, počinje da otkriva svoju misiju: da reši zagonetku misteriozne supstance zbog koje Sunce polako odumire.'
    },
    {
      id: 3,
      naziv: 'Početak',
      zanr: 'Sci-Fi / Akcija',
      trajanje: 169,
      recenzija: 5,
      slika: 'filmovi/inceptionposter.jpg',
      opis: 'Film govori o pljačkašu zvanom Dom Kob (Dom Cobb) koji ulazi u snove drugih ljudi kako bi prikupio informacije koje su inače nedostupne. Njegove sposobnosti koštale su ga njegove porodice i državljanstva, ali prilika za iskupljenje i povratak starom životu javlja se kada Kob i njegov tim specijalista biva upošljen da usadi određenu ideju u podsvest njihove mete.'
    },
    {
      id: 4,
      naziv: 'Zootropolis',
      zanr: 'Komedija',
      trajanje: 108,
      recenzija: 4.9,
      slika: 'filmovi/zootopia.jpg',
      opis: 'Radnja prati policajku početnicu, zečicu Džudi Hop, kao i prevaranta, lisca Nika Divljeg, koji zajedno rade na otkrivanju zavere oko nestanaka predatora.'
    },
    {
      id: 5,
      naziv: 'Uspon mračnog viteza',
      zanr: 'Akcija / Triler',
      trajanje: 165,
      recenzija: 4.2,
      slika: 'filmovi/batman.jpg',
      opis: 'Glavna uloga ponovo je poverena Kristijanu Bejlu, a Majkl Kejn, Gari Oldman i Morgan Friman takođe repriziraju svoje uloge iz prethodna dva dela. Filmskoj ekipi su se pridružili En Hatavej u ulozi lukave provalnice Seline Kajl i Tom Hardi kao Bejn, opasni terorista rešen da po svaku cenu uništi Gotam, čije akcije primoravaju Brusa Vejna da nakon duže pauze ponovo postane Betmen.'
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }
}