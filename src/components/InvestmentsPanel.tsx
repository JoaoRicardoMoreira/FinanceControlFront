'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import InvestmentChart from '@/components/InvestmentChart';
import {
  InvestmentConfig,
  InvestmentContribution,
} from '@/types';
import { formatCurrency } from '@/utils/helpers';
import {
  annualEquivalentPercent,
  buildPatrimonyTimeline,
  formatMonthLabel,
  getContributionForMonth,
} from '@/utils/investments';

interface InvestmentsPanelProps {
  investimentos: InvestmentContribution[];
  investimentoConfig: InvestmentConfig;
  filterMonth: number;
  filterYear: number;
  onSetConfig: (taxaMensalPercent: number) => void;
  onUpsert: (month: number, year: number, valor: number) => void;
  onDelete: (id: string) => void;
}

export default function InvestmentsPanel({
  investimentos,
  investimentoConfig,
  filterMonth,
  filterYear,
  onSetConfig,
  onUpsert,
  onDelete,
}: InvestmentsPanelProps) {
  const [taxaInput, setTaxaInput] = useState(String(investimentoConfig.taxaMensalPercent));
  const [manualValor, setManualValor] = useState('');

  useEffect(() => {
    setTaxaInput(String(investimentoConfig.taxaMensalPercent));
  }, [investimentoConfig.taxaMensalPercent]);

  const timeline = buildPatrimonyTimeline(investimentos, investimentoConfig, {
    year: filterYear,
    month: filterMonth,
  });

  const currentContribution = getContributionForMonth(
    investimentos,
    filterMonth,
    filterYear
  );

  const sorted = [...investimentos].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const handleSaveTaxa = () => {
    const taxa = Math.max(0, Number(taxaInput) || 0);
    onSetConfig(taxa);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = Number(manualValor);
    if (Number.isNaN(valor)) return;
    onUpsert(filterMonth, filterYear, valor);
    setManualValor('');
  };

  const annualEq = annualEquivalentPercent(investimentoConfig.taxaMensalPercent);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total aportado</p>
          <p className="text-2xl font-bold text-violet-400">
            {formatCurrency(timeline.totalAportado)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Patrimônio estimado</p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(timeline.patrimonioFinal)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Aporte em {formatMonthLabel(filterYear, filterMonth)}
          </p>
          <p className="text-2xl font-bold text-slate-100">
            {currentContribution
              ? formatCurrency(currentContribution.valor)
              : '—'}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
          Taxa de rendimento
        </h4>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Taxa mensal (%)
            </label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={taxaInput}
              onChange={(e) => setTaxaInput(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-zinc-200 outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            {investimentoConfig.taxaMensalPercent > 0 && (
              <p className="text-xs text-zinc-500 mt-2">
                Equivalente aproximado ao ano: {annualEq.toFixed(2)}% a.a.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSaveTaxa}
            className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-medium transition border border-violet-500/50"
          >
            Salvar taxa
          </button>
        </div>
      </Card>

      <InvestmentChart timeline={timeline} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
            Aporte manual — {formatMonthLabel(filterYear, filterMonth)}
          </h4>
          <form onSubmit={handleManualSubmit} className="flex gap-3">
            <input
              type="number"
              step="0.01"
              min={0}
              value={manualValor}
              onChange={(e) => setManualValor(e.target.value)}
              placeholder="Valor em R$"
              required
              className="flex-1 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-zinc-200 outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl font-medium transition"
            >
              Salvar
            </button>
          </form>
        </Card>

        <Card className="p-6 overflow-hidden">
          <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
            Histórico de aportes
          </h4>
          {sorted.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nenhum aporte registrado.</p>
          ) : (
            <div className="overflow-x-auto custom-scrollbar max-h-48">
              <table className="w-full text-left text-sm">
                <thead className="text-zinc-500 text-xs uppercase">
                  <tr>
                    <th className="pb-2 font-semibold">Mês</th>
                    <th className="pb-2 font-semibold text-right">Valor</th>
                    <th className="pb-2 font-semibold text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sorted.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5">
                      <td className="py-2 text-zinc-300">
                        {formatMonthLabel(item.year, item.month)}
                      </td>
                      <td className="py-2 text-right text-violet-400 font-medium">
                        {formatCurrency(item.valor)}
                      </td>
                      <td className="py-2 text-center">
                        <button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1"
                          title="Excluir"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
