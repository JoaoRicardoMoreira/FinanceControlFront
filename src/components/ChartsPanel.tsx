'use client';

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import Card from '@/components/ui/Card';
import { Transaction } from '@/types';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ChartsPanelProps {
  categories: string[];
  gastosPorCat: number[];
  metasPorCat: number[];
  allGastos: Transaction[];
  allRendas: Transaction[];
}

// Helper function to get last 6 months data
function getMonthlyData(gastos: Transaction[], rendas: Transaction[]) {
  const months: string[] = [];
  const gastosData: number[] = [];
  const rendasData: number[] = [];
  const saldoData: number[] = [];

  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

    months.push(`${monthName}/${year.toString().slice(2)}`);

    const monthGastos = gastos
      .filter((g) => {
        const d = new Date(g.data);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      })
      .reduce((acc, g) => acc + g.valor, 0);

    const monthRendas = rendas
      .filter((r) => {
        const d = new Date(r.data);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      })
      .reduce((acc, r) => acc + r.valor, 0);

    gastosData.push(monthGastos);
    rendasData.push(monthRendas);
    saldoData.push(monthRendas - monthGastos);
  }

  return { months, gastosData, rendasData, saldoData };
}

// Helper to get current vs previous month comparison
function getMonthComparison(gastos: Transaction[], categories: string[]) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = prevDate.getMonth() + 1;
  const prevYear = prevDate.getFullYear();

  const currentData = categories.map((cat) =>
    gastos
      .filter((g) => {
        const d = new Date(g.data);
        return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear && g.categoria === cat;
      })
      .reduce((acc, g) => acc + g.valor, 0)
  );

  const prevData = categories.map((cat) =>
    gastos
      .filter((g) => {
        const d = new Date(g.data);
        return d.getMonth() + 1 === prevMonth && d.getFullYear() === prevYear && g.categoria === cat;
      })
      .reduce((acc, g) => acc + g.valor, 0)
  );

  return { currentData, prevData };
}

export default function ChartsPanel({
  categories,
  gastosPorCat,
  metasPorCat,
  allGastos,
  allRendas,
}: ChartsPanelProps) {
  const { months, gastosData, rendasData, saldoData } = getMonthlyData(allGastos, allRendas);
  const { currentData, prevData } = getMonthComparison(allGastos, categories);

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

  // Line chart data - Monthly Evolution
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Receitas',
        data: rendasData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Despesas',
        data: gastosData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          color: '#94a3b8', 
          font: { size: 10 },
          callback: (value: number | string) => `R$ ${Number(value).toLocaleString('pt-BR')}`,
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
        callbacks: {
          label: (context: any) => `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        },
      },
    },
  };

  // Month comparison chart data
  const comparisonData = {
    labels: categories,
    datasets: [
      {
        label: 'Mês Anterior',
        data: prevData,
        backgroundColor: '#64748b',
        borderRadius: 4,
        barPercentage: 0.7,
      },
      {
        label: 'Mês Atual',
        data: currentData,
        backgroundColor: '#8b5cf6',
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  };

  const comparisonOptions = {
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
    <div className="space-y-6">
      {/* First row - Evolution chart (full width) */}
      <Card className="p-6">
        <h4 className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-6 uppercase tracking-wider text-center">
          Evolução Mensal (Últimos 6 meses)
        </h4>
        <div className="h-72">
          <Line data={lineData} options={lineOptions} />
        </div>
      </Card>

      {/* Second row - 2 charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-6 uppercase tracking-wider text-center">
            Gastos por Categoria
          </h4>
          <div className="h-64 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-6 uppercase tracking-wider text-center">
            Meta vs Realizado
          </h4>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </Card>
      </div>

      {/* Third row - Comparison chart (full width) */}
      <Card className="p-6">
        <h4 className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-6 uppercase tracking-wider text-center">
          Comparativo: Mês Atual vs Mês Anterior
        </h4>
        <div className="h-64">
          <Bar data={comparisonData} options={comparisonOptions} />
        </div>
      </Card>
    </div>
  );
}
