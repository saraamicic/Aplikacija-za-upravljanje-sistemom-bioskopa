import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatIcon, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  open = false;

  constructor(private router: Router) {}

  isApp(): boolean {
    return ['/bioskop', '/film', '/sala', '/rezervacija']
      .some(r => this.router.url.startsWith(r));
  }
}