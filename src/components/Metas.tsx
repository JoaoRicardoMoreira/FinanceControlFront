'use client';

import { MetaMap, Transaction } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface MetasProps {
  metas: MetaMap;
  gastos: Transaction[];
  onEditMeta: (categoria: string, currentValue: number) => void;
}

import Card from '@/components/ui/Card';

export default function Metas({ metas, gastos, onEditMeta }: MetasProps) {
  const gastosPorCategoria = (cat: string): number => {
    return gastos
      .filter((g) => g.categoria === cat)
      .reduce((acc, g) => acc + g.valor, 0);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-100">
        <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg border border-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </span>
        Metas por Categoria
      </h3>
      <div className="space-y-6">
        {Object.entries(metas).map(([categoria, meta]) => {
          const gasto = gastosPorCategoria(categoria);
          const isOverBudget = gasto > meta && meta > 0;
          const progress = meta > 0 ? Math.min((gasto / meta) * 100, 100) : 0;

          return (
            <div key={categoria} className="space-y-2 group">
              <div className="flex justify-between text-sm items-center">
                <span className="text-slate-300 font-medium">{categoria}</span>
                <div className="flex gap-3 items-center">
                  <span
                    className={
                      isOverBudget
                        ? 'text-rose-400 font-medium'
                        : 'text-slate-400 font-medium'
                    }
                  >
                    {formatCurrency(gasto)} <span className="text-slate-600">/</span> {formatCurrency(meta)}
                  </span>
                  <button
                    onClick={() => onEditMeta(categoria, gasto)}
                    className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 relative ${isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  style={{ width: `${progress}%` }}
                >
                  {/* Glossy shine on bar */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
