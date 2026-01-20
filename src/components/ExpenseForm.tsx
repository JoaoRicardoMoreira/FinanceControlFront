'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/types';
import Card from '@/components/ui/Card';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    desc: string;
    valor: number;
    data: string;
    categoria: string;
  }) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [form, setForm] = useState({
    desc: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: 'Alimentação',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.desc || !form.data || !form.valor) return;

    onAddExpense({
      desc: form.desc,
      valor: Number(form.valor),
      data: form.data,
      categoria: form.categoria,
    });

    setForm({
      desc: '',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      categoria: 'Alimentação',
    });
  };

  return (
<<<<<<< HEAD
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-100">
        <span className="bg-rose-500/10 text-rose-400 p-2 rounded-lg border border-rose-500/20 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]">
=======
    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="bg-rose-500/20 text-rose-400 p-1.5 rounded-lg">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Novo Gasto
      </h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
=======
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Descrição</label>
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
          <input
            type="text"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
<<<<<<< HEAD
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 outline-none transition-all placeholder:text-slate-600 hover:bg-slate-900/70"
            placeholder="Ex: Compras no Supermercado"
=======
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
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
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 outline-none transition-all placeholder:text-slate-600 hover:bg-slate-900/70"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Data</label>
=======
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
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
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 outline-none transition-all cursor-pointer hover:bg-slate-900/70"
=======
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition text-sm"
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
            />
          </div>
        </div>
        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-slate-400 mb-1.5">Categoria</label>
          <div className="relative">
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-900/70"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-slate-200 py-2">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
=======
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Categoria</label>
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
        </div>
        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-rose-500/25 active:scale-[0.98] border border-rose-500/50"
        >
          Adicionar Gasto
        </button>
      </form>
    </Card>
  );
}
