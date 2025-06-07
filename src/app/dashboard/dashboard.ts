import { Component, signal } from '@angular/core';
import { SensorData, SensorSummary } from '../core/model';
import { CommonModule } from '@angular/common';
import { APIService } from '../core/API.service';
import { Card } from '../card/card';
import { queryService } from '../core/query';
import { Header } from '../header/header';

@Component({
  selector: 'app-dashboard',
  imports: [Header,CommonModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  sensorData!: SensorData[];
  sensorCard = queryService();

  
}
