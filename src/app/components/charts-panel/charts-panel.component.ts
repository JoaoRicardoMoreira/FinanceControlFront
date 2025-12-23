import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts-panel.component.html',
})
export class ChartsPanelComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() categories: string[] = [];
  @Input() gastosPorCat: number[] = [];
  @Input() metasPorCat: number[] = [];

  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  private doughnutChart?: Chart;
  private barChart?: Chart;

  ngAfterViewInit(): void {
    // Inicializa os gráficos apenas quando a view estiver pronta
    this.updateCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Só tenta atualizar se a view já tiver sido iniciada
    if (this.doughnutCanvas && this.barCanvas) {
      this.updateCharts();
    }
  }

  ngOnDestroy(): void {
    this.doughnutChart?.destroy();
    this.barChart?.destroy();
  }

  private updateCharts() {
    this.updateDoughnut();
    this.updateBar();
  }

  private updateDoughnut() {
    if (!this.doughnutCanvas) return;

    // CONFIGURAÇÃO DO GRÁFICO (Separada para clareza)
    const data = {
      labels: this.categories,
      datasets: [{
        data: this.gastosPorCat,
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6b7280'],
        borderWidth: 0,
      }]
    };

    // CENÁRIO 1: Gráfico já existe -> Apenas atualiza dados
    if (this.doughnutChart) {
      this.doughnutChart.data = data;
      this.doughnutChart.update(); // Muito leve, apenas re-renderiza o canvas
    } 
    // CENÁRIO 2: Gráfico não existe -> Cria do zero
    else {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 10 }, usePointStyle: true } },
          },
        },
      });
    }
  }

  private updateBar() {
    if (!this.barCanvas) return;

    const data = {
      labels: this.categories,
      datasets: [
        { label: 'Gasto Real', data: this.gastosPorCat, backgroundColor: '#ef4444', borderRadius: 4 },
        { label: 'Meta', data: this.metasPorCat, backgroundColor: '#3b82f6', borderRadius: 4 },
      ],
    };

    if (this.barChart) {
      this.barChart.data = data;
      this.barChart.update();
    } else {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
          },
          plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', usePointStyle: true } } },
        },
      });
    }
  }
}