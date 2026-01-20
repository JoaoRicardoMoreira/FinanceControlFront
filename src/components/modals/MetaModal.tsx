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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
        <h3 className="text-2xl font-bold mb-2">Definir Meta</h3>
        <p className="text-emerald-400 font-medium mb-6">{category}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor da meta"
            className="w-full bg-gray-700 border-gray-600 rounded-xl px-4 py-3 text-xl focus:ring-2 focus:ring-emerald-500 outline-none transition mb-6"
          />
          <div className="flex gap-3">
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
              Definir Meta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
