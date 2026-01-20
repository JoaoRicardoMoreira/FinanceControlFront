'use client';

import { MetaMap, Transaction } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface MetasProps {
  metas: MetaMap;
  gastos: Transaction[];
  onEditMeta: (categoria: string) => void;
}

export default function Metas({ metas, gastos, onEditMeta }: MetasProps) {
  const gastosPorCategoria = (cat: string): number => {
    return gastos
      .filter((g) => g.categoria === cat)
      .reduce((acc, g) => acc + g.valor, 0);
  };

  return (
    <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="bg-blue-500/20 text-blue-400 p-1.5 rounded-lg">
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
      <div className="space-y-4">
        {Object.entries(metas).map(([categoria, meta]) => {
          const gasto = gastosPorCategoria(categoria);
          const isOverBudget = gasto > meta && meta > 0;
          const progress = meta > 0 ? Math.min((gasto / meta) * 100, 100) : 0;

          return (
            <div key={categoria} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{categoria}</span>
                <div className="flex gap-2 items-center">
                  <span
                    className={
                      isOverBudget
                        ? 'text-rose-400 font-medium'
                        : 'text-gray-400 font-medium'
                    }
                  >
                    {formatCurrency(gasto)} / {formatCurrency(meta)}
                  </span>
                  <button
                    onClick={() => onEditMeta(categoria)}
                    className="text-gray-500 hover:text-white"
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
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
