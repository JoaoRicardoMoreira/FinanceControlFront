'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/types';

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
    <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="bg-rose-500/20 text-rose-400 p-1.5 rounded-lg">
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Descrição</label>
          <input
            type="text"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Valor (R$)</label>
            <input
              type="number"
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
              step="0.01"
              required
              className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Data</label>
            <input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              required
              className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Categoria</label>
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none transition"
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
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-lg transition mt-2"
        >
          Adicionar Gasto
        </button>
      </form>
    </section>
  );
}
