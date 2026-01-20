'use client';

import { useMemo } from 'react';
import { MetaMap, Transaction } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import Card from '@/components/ui/Card';

interface MetasProps {
  metas: MetaMap;
  gastos: Transaction[];
  onEditMeta: (categoria: string, currentValue: number) => void;
}

export default function Metas({ metas, gastos, onEditMeta }: MetasProps) {
  const gastosPorCategoria = (cat: string): number => {
    return gastos
      .filter((g) => g.categoria === cat)
      .reduce((acc, g) => acc + g.valor, 0);
  };

  // Calculate summary statistics
  const summary = useMemo(() => {
    const entries = Object.entries(metas);
    const totalMetas = entries.reduce((acc, [, meta]) => acc + meta, 0);
    const totalGastos = entries.reduce((acc, [cat]) => acc + gastosPorCategoria(cat), 0);
    
    let withinBudget = 0;
    let nearLimit = 0;
    let overBudget = 0;
    
    entries.forEach(([cat, meta]) => {
      if (meta === 0) return;
      const gasto = gastosPorCategoria(cat);
      const percent = (gasto / meta) * 100;
      
      if (percent > 100) {
        overBudget++;
      } else if (percent >= 80) {
        nearLimit++;
      } else {
        withinBudget++;
      }
    });

    const savings = totalMetas - totalGastos;
    const totalCategories = entries.filter(([, meta]) => meta > 0).length;

    return { totalMetas, totalGastos, withinBudget, nearLimit, overBudget, savings, totalCategories };
  }, [metas, gastos]);

  // Get status for each category
  const getCategoryStatus = (gasto: number, meta: number) => {
    if (meta === 0) return 'none';
    const percent = (gasto / meta) * 100;
    if (percent > 100) return 'over';
    if (percent >= 80) return 'warning';
    return 'ok';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Meta Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(summary.totalMetas)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Dentro do Limite</p>
              <p className="text-lg font-bold text-emerald-400">{summary.withinBudget} <span className="text-xs font-normal text-gray-500 dark:text-slate-500">de {summary.totalCategories}</span></p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Atenção (80%+)</p>
              <p className="text-lg font-bold text-amber-400">{summary.nearLimit}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Estouradas</p>
              <p className="text-lg font-bold text-rose-400">{summary.overBudget}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Savings/Deficit Card */}
      <Card className={`p-4 ${summary.savings >= 0 ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${summary.savings >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${summary.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {summary.savings >= 0 ? 'Economia Potencial' : 'Déficit'}
              </p>
              <p className={`text-2xl font-bold ${summary.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatCurrency(Math.abs(summary.savings))}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-slate-400">Gasto Total</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(summary.totalGastos)}</p>
          </div>
        </div>
      </Card>

      {/* Categories List */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-slate-100">
          <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg border border-blue-500/20">
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
            const status = getCategoryStatus(gasto, meta);
            const progress = meta > 0 ? Math.min((gasto / meta) * 100, 100) : 0;
            const progressPercent = meta > 0 ? Math.round((gasto / meta) * 100) : 0;

            return (
              <div 
                key={categoria} 
                className={`p-4 rounded-xl border transition-all ${
                  status === 'over' 
                    ? 'bg-rose-500/5 border-rose-500/20' 
                    : status === 'warning'
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 dark:text-slate-200 font-medium">{categoria}</span>
                    {status === 'over' && (
                      <span className="text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-full font-medium">
                        ESTOURADA
                      </span>
                    )}
                    {status === 'warning' && (
                      <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-medium">
                        ATENÇÃO
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      {progressPercent}%
                    </span>
                    <button
                      onClick={() => onEditMeta(categoria, gasto)}
                      className="text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg"
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
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 relative ${
                        status === 'over' 
                          ? 'bg-rose-500' 
                          : status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                    </div>
                  </div>
                  <span className={`text-sm font-medium min-w-[140px] text-right ${
                    status === 'over' ? 'text-rose-400' : 'text-gray-600 dark:text-slate-300'
                  }`}>
                    {formatCurrency(gasto)} / {formatCurrency(meta)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
