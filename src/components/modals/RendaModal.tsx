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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">Adicionar Renda</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Descrição</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              placeholder="Ex: Salário, 13º, Venda..."
              className="w-full bg-gray-700 border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
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
                className="w-full bg-gray-700 border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Data</label>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
                className="w-full bg-gray-700 border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold transition"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
