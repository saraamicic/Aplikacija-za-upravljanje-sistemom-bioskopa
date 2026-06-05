import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  imports: [CommonModule],
  templateUrl: './author.html',
  styleUrl: './author.css'
})
export class Author implements OnInit {

  preporuceniFilmovi = [
    { naziv: 'Barbie', slika: 'filmovi/barbi.jpg' },
    { naziv: 'Godfather', slika: 'filmovi/kum.jpg' },
    { naziv: 'Legally blonde', slika: 'filmovi/legallyblonde.jpg' },
    { naziv: 'Inglourious Basterds', slika: 'filmovi/inglor.jpg' }, 
    { naziv: 'Joker', slika: 'filmovi/joker.jpg' },
    { naziv: 'Monsters, Inc.', slika: 'filmovi/monstersinc.jpg' }, 
    { naziv: 'John Wick: Chapter 3', slika: 'filmovi/johnwickchapter3.jpg' },
    { naziv: 'Oppenheimer', slika: 'filmovi/oppenheimer.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}