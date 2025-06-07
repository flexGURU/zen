import { Component, Input } from '@angular/core';
import { SensorSummary } from '../core/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() data!: SensorSummary;
  constructor() {}
}
