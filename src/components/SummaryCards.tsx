'use client';

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
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <p className="text-gray-400 text-sm mb-1">Saldo no Período</p>
        <h2 className="text-3xl font-bold text-white">{formatCurrency(saldo)}</h2>
        <div
          className={`mt-2 text-xs font-medium px-2 py-1 rounded-full inline-block ${
            saldo >= 0
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/20 text-rose-400'
          }`}
        >
          {saldo >= 0 ? 'Saldo Positivo' : 'Saldo Negativo'}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <p className="text-gray-400 text-sm mb-1">Renda no Período</p>
        <h2 className="text-3xl font-bold text-emerald-400">{formatCurrency(totalRenda)}</h2>
        <button
          onClick={onOpenRenda}
          className="mt-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
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
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <p className="text-gray-400 text-sm mb-1">Gasto vs Meta (Período)</p>
        <h2 className="text-3xl font-bold text-rose-400">{formatCurrency(totalGasto)}</h2>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
