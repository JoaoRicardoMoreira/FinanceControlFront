'use client';

import { useState, useEffect } from 'react';

interface MetaModalProps {
  open: boolean;
  category: string;
  currentValue: number;
  onClose: () => void;
  onSave: (value: number) => void;
}

export default function MetaModal({
  open,
  category,
  currentValue,
  onClose,
  onSave,
}: MetaModalProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (open) {
      setValue(currentValue.toString());
    }
  }, [open, currentValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(Number(value) || 0);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-2 text-slate-100">Definir Meta</h3>
        <p className="text-emerald-400 font-medium mb-6">{category}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor da meta"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xl focus:ring-2 focus:ring-emerald-500/50 outline-none transition mb-6 text-slate-200 placeholder:text-slate-600"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition shadow-lg hover:shadow-emerald-500/25 border border-emerald-500/50"
            >
              Definir Meta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
