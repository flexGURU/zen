import { Component, Input } from '@angular/core';
import { SensorSummary } from '../core/model';
import { CommonModule } from '@angular/common';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-card',
  imports: [CommonModule, Loader],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() data!: SensorSummary;
  constructor() {}
}
