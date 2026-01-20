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
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-slate-100">
        <span className="bg-rose-500/10 text-rose-400 p-2 rounded-lg border border-rose-500/20">
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
          <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Descrição</label>
          <input
            type="text"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
            className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600"
            placeholder="Ex: Compras no Supermercado"
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
              className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Data</label>
            <input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              required
              className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/50 outline-none transition-all cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-slate-400 mb-1.5">Categoria</label>
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="w-full bg-gray-100 dark:bg-slate-900/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-rose-500/25 active:scale-[0.98]"
        >
          Adicionar Gasto
        </button>
      </form>
    </Card>
  );
}
