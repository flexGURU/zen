import { Component, signal } from '@angular/core';
import { SensorData, SensorSummary } from '../core/model';
import { CommonModule } from '@angular/common';
import { APIService } from '../core/API.service';
import { Card } from '../card/card';
import { queryService } from '../core/query';
import { Header } from '../header/header';
import { Loader } from "../loader/loader";
import { ChartView } from "../chart-view/chart-view";

@Component({
  selector: 'app-dashboard',
  imports: [Header, CommonModule, Card, Loader, ChartView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  sensorData!: SensorData[];
  sensorCard = queryService();


  
}
