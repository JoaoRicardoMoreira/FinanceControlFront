'use client';

import { useEffect, useState } from 'react';
import { CATEGORIES, Transaction } from '@/types';

interface EditTransactionModalProps {
  open: boolean;
  type: 'gasto' | 'renda';
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

export default function EditTransactionModal({
  open,
  type,
  transaction,
  onClose,
  onSave,
}: EditTransactionModalProps) {
  const [form, setForm] = useState({
    desc: '',
    valor: '',
    data: '',
    categoria: 'Alimentação',
  });

  useEffect(() => {
    if (open && transaction) {
      setForm({
        desc: transaction.desc,
        valor: String(transaction.valor),
        data: transaction.data,
        categoria: transaction.categoria ?? 'Alimentação',
      });
    }
  }, [open, transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction || !form.desc || !form.valor || !form.data) return;

    onSave({
      ...transaction,
      desc: form.desc,
      valor: Number(form.valor),
      data: form.data,
      categoria: type === 'gasto' ? form.categoria : undefined,
    });
    onClose();
  };

  if (!open || !transaction) return null;

  const isGasto = type === 'gasto';

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-6 text-slate-100">
          Editar {isGasto ? 'Gasto' : 'Renda'}
        </h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Valor (R$)</label>
              <input
                type="number"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                step="0.01"
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200 text-sm"
              />
            </div>
          </div>
          {isGasto && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg hover:shadow-blue-500/25 border border-blue-500/50"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
