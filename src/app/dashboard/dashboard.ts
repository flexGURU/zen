import { Component } from '@angular/core';
import { SensorData } from '../core/model';
import { CommonModule } from '@angular/common';
import { queryService } from '../core/query';
import { Loader } from '../loader/loader';
import { ChartView } from '../chart-view/chart-view';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Loader, ChartView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  sensorData!: SensorData[];
  sensorCard = queryService();
}
