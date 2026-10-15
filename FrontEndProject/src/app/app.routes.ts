import { Routes } from '@angular/router';
import { BioskopComponent } from './components/main/bioskop/bioskop';
import { SalaComponent } from './components/main/sala/sala';
import { FilmComponent } from './components/main/film/film';
import { RezervacijaComponent } from './components/main/rezervacija/rezervacija';
import { Author } from './components/utility/author/author';
import { About } from './components/utility/about/about';
import { Home } from './components/utility/home/home';

//definisemo rute, pravimo konfiguracione objekte koje smestamo u ovaj niz, svaki objekat ima 2 propertija (path koji kaze ako 
//url odgovara pathu ti uradi nesto, i component je komponenta na koju prebacujemo ako odgovara url)

export const routes: Routes = [
{path: 'bioskop', component: BioskopComponent},
{path: 'sala', component: SalaComponent},
{path: 'film', component: FilmComponent},
{path: 'rezervacija', component: RezervacijaComponent},
{path: 'author', component:Author},
{path: 'about', component: About},
{path: '', component:Home, pathMatch:"full"},
];
