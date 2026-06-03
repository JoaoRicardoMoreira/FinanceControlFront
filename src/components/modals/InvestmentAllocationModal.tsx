'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

interface InvestmentAllocationModalProps {
  open: boolean;
  saldoBruto: number;
  aporteAtual?: number;
  monthLabel: string;
  onClose: () => void;
  onConfirm: (valor: number) => void;
}

export default function InvestmentAllocationModal({
  open,
  saldoBruto,
  aporteAtual = 0,
  monthLabel,
  onClose,
  onConfirm,
}: InvestmentAllocationModalProps) {
  const [valor, setValor] = useState('');

  useEffect(() => {
    if (open) setValor('');
  }, [open]);

  if (!open) return null;

  const valorNum = Math.max(0, Number(valor) || 0);
  const saldoAposAporte = saldoBruto - valorNum;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-2 text-slate-100">Investimento do mês</h3>
        <p className="text-sm text-zinc-500 mb-6">
          Informe o valor fixo que você pretende investir em{' '}
          <span className="text-zinc-300">{monthLabel}</span>. Esse valor será descontado do
          saldo previsto do período.
        </p>

        <div className="bg-white/5 rounded-xl border border-white/5 p-4 mb-4 space-y-3">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Saldo antes do investimento (renda − gastos)
            </p>
            <p
              className={`text-xl font-bold ${saldoBruto >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
            >
              {formatCurrency(saldoBruto)}
            </p>
          </div>
          {aporteAtual > 0 && (
            <p className="text-xs text-violet-400/90">
              Aporte já registrado neste mês: {formatCurrency(aporteAtual)}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Valor a investir (R$)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 1000, 2000..."
            required
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/50 text-slate-200 placeholder:text-zinc-600"
          />
          {valorNum > 0 && (
            <p className="text-xs text-zinc-400 mt-2">
              Saldo livre após aporte:{' '}
              <span
                className={saldoAposAporte >= 0 ? 'text-emerald-400' : 'text-rose-400'}
              >
                {formatCurrency(saldoAposAporte)}
              </span>
            </p>
          )}
          {valorNum > 0 && saldoBruto > 0 && valorNum > saldoBruto && (
            <p className="text-xs text-amber-400 mt-2">
              Valor acima do saldo (renda − gastos) — o registro será feito mesmo assim para seu
              controle.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(valorNum)}
            disabled={!valor || valorNum <= 0}
            className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition border border-violet-500/50"
          >
            Registrar aporte
          </button>
        </div>
      </div>
    </div>
  );
}
