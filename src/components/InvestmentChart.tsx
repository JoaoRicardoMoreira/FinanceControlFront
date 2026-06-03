'use client';

import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Card from '@/components/ui/Card';
import { PatrimonyTimeline } from '@/utils/investments';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface InvestmentChartProps {
  timeline: PatrimonyTimeline;
}

export default function InvestmentChart({ timeline }: InvestmentChartProps) {
  if (timeline.points.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-zinc-500 text-sm">
          Cadastre um aporte na dashboard ou abaixo para ver a evolução do patrimônio.
        </p>
      </Card>
    );
  }

  const labels = timeline.points.map((p) => p.label);
  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Aporte do mês',
        data: timeline.points.map((p) => p.aporte),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgba(139, 92, 246, 0.8)',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y',
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Patrimônio estimado',
        data: timeline.points.map((p) => p.patrimonio),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#34d399',
        tension: 0.3,
        yAxisID: 'y',
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#94a3b8',
          font: { size: 10 },
          callback: (value: number | string) => {
            const num = Number(value);
            if (num >= 1000) return `R$ ${(num / 1000).toFixed(0)}k`;
            return `R$ ${num}`;
          },
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          font: { size: 11 },
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  return (
    <Card className="p-6">
      <h4 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider text-center">
        Evolução do patrimônio (desde{' '}
        {timeline.firstMonth
          ? `${String(timeline.firstMonth.month).padStart(2, '0')}/${timeline.firstMonth.year}`
          : '—'}
        )
      </h4>
      <div className="h-80">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </Card>
  );
}
