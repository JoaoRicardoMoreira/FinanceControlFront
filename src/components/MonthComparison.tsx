'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '@/components/ui/Card';
import {
  CategoryComparison,
  formatPercentChange,
  MetricComparison,
  MonthComparisonData,
} from '@/utils/monthComparison';
import { formatCurrency } from '@/utils/helpers';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface MonthComparisonProps {
  data: MonthComparisonData;
}

function ChangeBadge({
  percentChange,
  diff,
  invertColors = false,
}: {
  percentChange: number | null;
  diff: number;
  invertColors?: boolean;
}) {
  const isNeutral = diff === 0 || percentChange === 0;
  const isPositive = diff > 0;

  let colorClass = 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
  if (!isNeutral) {
    const good = invertColors ? !isPositive : isPositive;
    colorClass = good
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}
    >
      {formatPercentChange(percentChange)}
      {diff !== 0 && (
        <span className="opacity-80">
          ({diff > 0 ? '+' : ''}
          {formatCurrency(diff)})
        </span>
      )}
    </span>
  );
}

function SummaryMetricCard({
  title,
  metric,
  colorClass,
  invertColors = false,
}: {
  title: string;
  metric: MetricComparison;
  colorClass: string;
  invertColors?: boolean;
}) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{title}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>{formatCurrency(metric.current)}</p>
      <p className="text-xs text-zinc-500 mt-1">
        Mês anterior: {formatCurrency(metric.previous)}
      </p>
      <div className="mt-3">
        <ChangeBadge
          percentChange={metric.percentChange}
          diff={metric.diff}
          invertColors={invertColors}
        />
      </div>
    </Card>
  );
}

function CategoryRow({ row }: { row: CategoryComparison }) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-zinc-200">{row.category}</td>
      <td className="px-4 py-3 text-sm text-right text-zinc-300">
        {formatCurrency(row.current)}
      </td>
      <td className="px-4 py-3 text-sm text-right text-zinc-500">
        {formatCurrency(row.previous)}
      </td>
      <td className="px-4 py-3 text-sm text-right">
        <span className={row.diff > 0 ? 'text-rose-400' : row.diff < 0 ? 'text-emerald-400' : 'text-zinc-400'}>
          {row.diff > 0 ? '+' : ''}
          {formatCurrency(row.diff)}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <ChangeBadge percentChange={row.percentChange} diff={row.diff} invertColors />
      </td>
    </tr>
  );
}

export default function MonthComparison({ data }: MonthComparisonProps) {
  const chartLabels = data.categories.map((c) => c.category);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: data.currentLabel,
        data: data.categories.map((c) => c.current),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barPercentage: 0.7,
      },
      {
        label: data.previousLabel,
        data: data.categories.map((c) => c.previous),
        backgroundColor: '#64748b',
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const hasCategoryData = data.categories.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Comparativo mês a mês</h3>
        <p className="text-sm text-zinc-500 mt-1">
          {data.currentLabel} comparado com {data.previousLabel} (inclui fixos mensais)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryMetricCard
          title="Renda"
          metric={data.renda}
          colorClass="text-emerald-400"
        />
        <SummaryMetricCard
          title="Gastos"
          metric={data.gasto}
          colorClass="text-rose-400"
          invertColors
        />
        <SummaryMetricCard
          title="Saldo"
          metric={data.saldo}
          colorClass={data.saldo.current >= 0 ? 'text-emerald-400' : 'text-rose-400'}
        />
      </div>

      {hasCategoryData ? (
        <>
          <Card className="p-6">
            <h4 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider text-center">
              Gastos por categoria — comparativo
            </h4>
            <div className="h-72">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
              <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Detalhamento por categoria
              </h4>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/50 text-zinc-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Categoria</th>
                    <th className="px-4 py-3 font-semibold text-right">{data.currentLabel}</th>
                    <th className="px-4 py-3 font-semibold text-right">{data.previousLabel}</th>
                    <th className="px-4 py-3 font-semibold text-right">Diferença</th>
                    <th className="px-4 py-3 font-semibold text-right">Variação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.categories.map((row) => (
                    <CategoryRow key={row.category} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-zinc-500 text-sm">
            Sem gastos registrados neste mês ou no mês anterior para comparar por categoria.
          </p>
        </Card>
      )}
    </div>
  );
}
