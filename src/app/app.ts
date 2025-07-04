import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIService } from './core/API.service';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'zen';
}
