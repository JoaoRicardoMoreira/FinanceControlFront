'use client';

import { useState, useEffect } from 'react';

interface RendaModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (renda: { desc: string; valor: number; data: string }) => void;
}

export default function RendaModal({ open, onClose, onSubmit }: RendaModalProps) {
  const [form, setForm] = useState({
    desc: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (!open) {
      setForm({
        desc: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.desc || !form.valor || !form.data) return;

    onSubmit({
      desc: form.desc,
      valor: Number(form.valor),
      data: form.data,
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900/90 p-8 rounded-2xl border border-gray-200 dark:border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-slate-100">Adicionar Renda</h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Descrição</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              placeholder="Ex: Salário, 13º, Venda..."
              className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-slate-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Valor (R$)</label>
              <input
                type="number"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                step="0.01"
                required
                className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
                className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-slate-200 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-700 dark:text-slate-300 py-3 rounded-xl transition border border-gray-300 dark:border-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition shadow-lg hover:shadow-emerald-500/25 border border-emerald-500/50"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
