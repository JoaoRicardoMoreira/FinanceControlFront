'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES, Recurrence } from '@/types';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onAddGasto: (gasto: { desc: string; valor: number; data: string; categoria: string }) => void;
  onAddRenda: (renda: { desc: string; valor: number; data: string }) => void;
  onAddRecurrence: (recurrence: Recurrence) => void;
}

type TabType = 'despesa' | 'receita' | 'recorrente';

export default function TransactionModal({
  open,
  onClose,
  onAddGasto,
  onAddRenda,
  onAddRecurrence,
}: TransactionModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('despesa');
  const [isVisible, setIsVisible] = useState(false);

  // Form states
  const [gastoForm, setGastoForm] = useState({
    desc: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: 'Alimentação',
  });

  const [rendaForm, setRendaForm] = useState({
    desc: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
  });

  const [recurrenceForm, setRecurrenceForm] = useState<Recurrence>({
    tipo: 'gasto',
    desc: '',
    valor: 0,
    dia: 1,
    categoria: 'Alimentação',
  });

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setGastoForm({
        desc: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
        categoria: 'Alimentação',
      });
      setRendaForm({
        desc: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
      });
      setRecurrenceForm({
        tipo: 'gasto',
        desc: '',
        valor: 0,
        dia: 1,
        categoria: 'Alimentação',
      });
    }
  }, [open]);

  const handleGastoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gastoForm.desc || !gastoForm.valor || !gastoForm.data) return;

    onAddGasto({
      desc: gastoForm.desc,
      valor: Number(gastoForm.valor),
      data: gastoForm.data,
      categoria: gastoForm.categoria,
    });

    onClose();
  };

  const handleRendaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rendaForm.desc || !rendaForm.valor || !rendaForm.data) return;

    onAddRenda({
      desc: rendaForm.desc,
      valor: Number(rendaForm.valor),
      data: rendaForm.data,
    });

    onClose();
  };

  const handleRecurrenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recurrenceForm.desc || !recurrenceForm.valor || !recurrenceForm.dia) return;

    onAddRecurrence({
      ...recurrenceForm,
      valor: Number(recurrenceForm.valor),
      dia: Number(recurrenceForm.dia),
    });

    setRecurrenceForm({
      tipo: 'gasto',
      desc: '',
      valor: 0,
      dia: 1,
      categoria: 'Alimentação',
    });
  };

  if (!isVisible && !open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content - Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out max-h-[90vh] overflow-hidden ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
            Nova Transação
          </h2>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('despesa')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'despesa'
                  ? 'bg-white dark:bg-gray-700 text-rose-500 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Despesa
            </button>
            <button
              onClick={() => setActiveTab('receita')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'receita'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Receita
            </button>
            <button
              onClick={() => setActiveTab('recorrente')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'recorrente'
                  ? 'bg-white dark:bg-gray-700 text-purple-500 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Recorrente
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-8 overflow-y-auto max-h-[60vh]">
          {/* Despesa Form */}
          {activeTab === 'despesa' && (
            <form onSubmit={handleGastoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Nome da transação *
                </label>
                <input
                  type="text"
                  value={gastoForm.desc}
                  onChange={(e) => setGastoForm({ ...gastoForm, desc: e.target.value })}
                  required
                  placeholder="Ex: Almoço no restaurante"
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-rose-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Valor *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    R$
                  </span>
                  <input
                    type="number"
                    value={gastoForm.valor}
                    onChange={(e) => setGastoForm({ ...gastoForm, valor: e.target.value })}
                    step="0.01"
                    required
                    placeholder="0,00"
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-rose-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Data
                </label>
                <input
                  type="date"
                  value={gastoForm.data}
                  onChange={(e) => setGastoForm({ ...gastoForm, data: e.target.value })}
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Categoria
                </label>
                <select
                  value={gastoForm.categoria}
                  onChange={(e) => setGastoForm({ ...gastoForm, categoria: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none transition"
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
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition mt-4"
              >
                Salvar Despesa
              </button>
            </form>
          )}

          {/* Receita Form */}
          {activeTab === 'receita' && (
            <form onSubmit={handleRendaSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Nome da transação *
                </label>
                <input
                  type="text"
                  value={rendaForm.desc}
                  onChange={(e) => setRendaForm({ ...rendaForm, desc: e.target.value })}
                  required
                  placeholder="Ex: Salário, Freelance..."
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Valor *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    R$
                  </span>
                  <input
                    type="number"
                    value={rendaForm.valor}
                    onChange={(e) => setRendaForm({ ...rendaForm, valor: e.target.value })}
                    step="0.01"
                    required
                    placeholder="0,00"
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Data
                </label>
                <input
                  type="date"
                  value={rendaForm.data}
                  onChange={(e) => setRendaForm({ ...rendaForm, data: e.target.value })}
                  required
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition mt-4"
              >
                Salvar Receita
              </button>
            </form>
          )}

          {/* Recorrente Form */}
          {activeTab === 'recorrente' && (
            <form onSubmit={handleRecurrenceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Tipo
                </label>
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setRecurrenceForm({ ...recurrenceForm, tipo: 'gasto' })}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      recurrenceForm.tipo === 'gasto'
                        ? 'bg-white dark:bg-gray-700 text-rose-500 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Despesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecurrenceForm({ ...recurrenceForm, tipo: 'renda' })}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      recurrenceForm.tipo === 'renda'
                        ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Receita
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Descrição *
                </label>
                <input
                  type="text"
                  value={recurrenceForm.desc}
                  onChange={(e) => setRecurrenceForm({ ...recurrenceForm, desc: e.target.value })}
                  required
                  placeholder="Ex: Aluguel, Internet, Salário..."
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Valor *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                      R$
                    </span>
                    <input
                      type="number"
                      value={recurrenceForm.valor || ''}
                      onChange={(e) => setRecurrenceForm({ ...recurrenceForm, valor: Number(e.target.value) })}
                      step="0.01"
                      required
                      className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Dia do mês *
                  </label>
                  <input
                    type="number"
                    value={recurrenceForm.dia}
                    onChange={(e) => setRecurrenceForm({ ...recurrenceForm, dia: Number(e.target.value) })}
                    min="1"
                    max="31"
                    required
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                  />
                </div>
              </div>

              {recurrenceForm.tipo === 'gasto' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={recurrenceForm.categoria}
                    onChange={(e) => setRecurrenceForm({ ...recurrenceForm, categoria: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition mt-4"
              >
                Salvar Recorrente
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
