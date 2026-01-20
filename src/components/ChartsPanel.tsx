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

import Card from '@/components/ui/Card';

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
          '#10b981', // Emerald 500
          '#3b82f6', // Blue 500
          '#f59e0b', // Amber 500
          '#ef4444', // Red 500
          '#8b5cf6', // Violet 500
          '#ec4899', // Pink 500
          '#6366f1', // Indigo 500
        ],
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        hoverOffset: 4,
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
          color: '#94a3b8', // slate-400
          font: { size: 10, family: "'Inter', sans-serif" },
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: '75%',
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Gasto Real',
        data: gastosPorCat,
        backgroundColor: '#ef4444',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Meta',
        data: metasPorCat,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barPercentage: 0.6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
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
          font: { size: 10 },
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
        displayColors: true,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< HEAD
      <Card className="p-6">
        <h4 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider text-center">
=======
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
          Gastos por Categoria
        </h4>
        <div className="h-64 relative">
          {/* Center Text for Doughnut - Optional */}
          {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-200">Total</span>
            </div> */}
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
<<<<<<< HEAD
      </Card>

      <Card className="p-6">
        <h4 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider text-center">
=======
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
          Meta vs Realizado
        </h4>
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </Card>
    </div>
  );
}
