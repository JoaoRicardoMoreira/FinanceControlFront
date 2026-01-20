'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartsPanelProps {
  categories: string[];
  gastosPorCat: number[];
  metasPorCat: number[];
}

export default function ChartsPanel({
  categories,
  gastosPorCat,
  metasPorCat,
}: ChartsPanelProps) {
  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: gastosPorCat,
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
          '#6b7280',
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          font: { size: 10 },
          usePointStyle: true,
        },
      },
    },
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Gasto Real',
        data: gastosPorCat,
        backgroundColor: '#ef4444',
        borderRadius: 4,
      },
      {
        label: 'Meta',
        data: metasPorCat,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#374151' },
        ticks: { color: '#9ca3af' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af' },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
          Gastos por Categoria
        </h4>
        <div className="h-64">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
          Meta vs Realizado
        </h4>
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
