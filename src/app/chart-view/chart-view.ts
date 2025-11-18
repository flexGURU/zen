import { Component, computed, effect } from '@angular/core';
import { APIService } from '../core/API.service';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { queryService } from '../core/query';
import { Loader } from '../loader/loader';
import { CommonModule } from '@angular/common';

// Register the components
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-chart-view',
  imports: [Loader, CommonModule],
  templateUrl: './chart-view.html',
  styleUrl: './chart-view.css',
})
export class ChartView {
  public chart: any;
  sensorData = queryService();

  constructor() {
    effect(() => {
      if (this.sensorData.data()) {
        this.transformData();
      }
    });
  }

  ngOnInit(): void {
    this.createEmptyChart();
  }

  transformData = () => {
    const data = this.sensorData.data().data;
    const labels = data.map((entry: any) => {
      const date = new Date(entry.timestamp);
      return `${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    });
    const co2Values = data.map((entry: any) => entry.payload.co2);
    const pressureValues = data.map((entry: any) => entry.payload.pressure);
    const temperatureValues = data.map(
      (entry: any) => entry.payload.temperature
    );

    this.updateChart(labels, co2Values, pressureValues, temperatureValues);
  };

  chartData = computed(() => {
    if (this.sensorData.data()) {
      const data = this.sensorData.data();
    }
  });

  createEmptyChart() {
    this.chart = new Chart('sensorChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'CO2',
            data: [],
            fill: false,
            borderColor: 'rgb(220, 20, 60)',
            tension: 0.3,
          },
          {
            label: 'Pressure',
            data: [],
            fill: false,
            borderColor: 'rgb(30, 144, 255)',
            tension: 0.3,
          },
          {
            label: 'Temperature',
            data: [],
            fill: false,
            borderColor: 'rgb(34, 139, 34)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Time (HH:MM)' },
          },
        },
      },
    });
  }

  updateChart(
    labels: string[],
    co2Values: number[],
    pressureValues: number[],
    temperatureValues: number[]
  ) {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = co2Values;
      this.chart.data.datasets[1].data = pressureValues;
      this.chart.data.datasets[2].data = temperatureValues;

      this.chart.update();
    }
  }
}
