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
<<<<<<< HEAD
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-6 text-slate-100">Adicionar Renda</h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
=======
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">Adicionar Renda</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Descrição</label>
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
            <input
              type="text"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              placeholder="Ex: Salário, 13º, Venda..."
<<<<<<< HEAD
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-200"
=======
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Valor (R$)</label>
=======
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Valor (R$)</label>
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
              <input
                type="number"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                step="0.01"
                required
<<<<<<< HEAD
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Data</label>
=======
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Data</label>
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
<<<<<<< HEAD
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-200 text-sm"
=======
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
<<<<<<< HEAD
              className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
=======
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-3 rounded-xl transition"
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
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
