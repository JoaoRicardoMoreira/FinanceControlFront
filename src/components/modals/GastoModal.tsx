'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES } from '@/types';

interface GastoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (gasto: { desc: string; valor: number; data: string; categoria: string }) => void;
  onOpenRenda: () => void;
}

export default function GastoModal({ open, onClose, onSubmit, onOpenRenda }: GastoModalProps) {
  const [form, setForm] = useState({
    desc: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: 'Alimentação',
  });

  useEffect(() => {
    if (!open) {
      setForm({
        desc: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
        categoria: 'Alimentação',
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
      categoria: form.categoria,
    });

    onClose();
  };

  const handleGoToRenda = () => {
    onClose();
    onOpenRenda();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
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
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Descrição</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              placeholder="Ex: Mercado, Uber, Cinema..."
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Valor (R$)</label>
              <input
                type="number"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                step="0.01"
                required
                placeholder="0,00"
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold transition"
            >
              Adicionar
            </button>
          </div>
        </form>

        {/* <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={handleGoToRenda}
            className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
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
            Adicionar Nova Renda
          </button>
        </div> */}
      </div>
    </div>
  );
}
