'use client';

import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/helpers';

interface SummaryCardsProps {
  saldo: number;
  totalRenda: number;
  totalGasto: number;
  metaGlobal: number;
  onOpenRenda: () => void;
}

export default function SummaryCards({
  saldo,
  totalRenda,
  totalGasto,
  metaGlobal,
  onOpenRenda,
}: SummaryCardsProps) {
  const progress = metaGlobal > 0 ? Math.min((totalGasto / metaGlobal) * 100, 100) : 0;
  const isOverBudget = metaGlobal > 0 && totalGasto > metaGlobal;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6">
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-1">Saldo no Período</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{formatCurrency(saldo)}</h2>
        <div
          className={`mt-2 text-xs font-medium px-2 py-1 rounded-full inline-block ${saldo >= 0
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(16,185,129,0.3)]'
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_-3px_rgba(244,63,94,0.3)]'
            }`}
        >
          {saldo >= 0 ? 'Saldo Positivo' : 'Saldo Negativo'}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-1">Renda no Período</p>
        <h2 className="text-3xl font-bold text-emerald-400">{formatCurrency(totalRenda)}</h2>
        <button
          onClick={onOpenRenda}
          className="hidden md:flex mt-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg transition items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nova Renda
        </button>
      </Card>

      <Card className="p-6">
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-1">Gasto vs Meta (Período)</p>
        <h2 className="text-3xl font-bold text-rose-400">{formatCurrency(totalGasto)}</h2>
        <div className="w-full bg-gray-200 dark:bg-white/5 rounded-full h-2 mt-3 border border-gray-300 dark:border-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 relative ${isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </Card>
    </div>
  );
}
