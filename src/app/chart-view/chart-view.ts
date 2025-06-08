import { Component } from '@angular/core';
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
  imports: [],
  templateUrl: './chart-view.html',
  styleUrl: './chart-view.css',
})
export class ChartView {
  chart: Chart | null = null;

  constructor(private sensorService: APIService) {}

  ngOnInit(): void {
    this.createEmptyChart();
    this.fetchSensorHistory('co2');
  }

  fetchSensorHistory(sensorType: string) {
    this.sensorService
      .GetSensorHistory('esp32-001', sensorType)
      .subscribe((resp) => {
        const labels: string[] = [];
        const values: number[] = [];

        resp.forEach((data: any) => {
          const timeLabel = new Date(data.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          labels.push(timeLabel);
          values.push(data.measureValue);
        });

        this.updateChart(labels, values);
      });
  }

  createEmptyChart() {
    const ctx = document.getElementById('sensorChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Reading',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 139, 139)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
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

  updateChart(labels: string[], values: number[]) {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = values;
      this.chart.update();
    }
  }
}
