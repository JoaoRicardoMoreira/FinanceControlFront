'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';

interface HistoryTabsProps {
  gastos: Transaction[];
  rendas: Transaction[];
  onDeleteGasto: (index: number) => void;
  onDeleteRenda: (index: number) => void;
}

export default function HistoryTabs({
  gastos,
  rendas,
  onDeleteGasto,
  onDeleteRenda,
}: HistoryTabsProps) {
  const [activeTab, setActiveTab] = useState<'gastos' | 'rendas'>('gastos');

  const sortedGastos = gastos
    .map((g, index) => ({ g, index }))
    .sort((a, b) => new Date(b.g.data).getTime() - new Date(a.g.data).getTime());

  const sortedRendas = rendas
    .map((r, index) => ({ r, index }))
    .sort((a, b) => new Date(b.r.data).getTime() - new Date(a.r.data).getTime());

  return (
<<<<<<< HEAD
    <Card className="overflow-hidden">
      <div className="flex border-b border-white/5">
=======
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
        <button
          onClick={() => setActiveTab('gastos')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'gastos'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
<<<<<<< HEAD
              : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
=======
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }`}
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
        >
          GASTOS
        </button>
        <button
          onClick={() => setActiveTab('rendas')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'rendas'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
<<<<<<< HEAD
              : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
=======
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }`}
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
        >
          RENDAS
        </button>
      </div>

      {activeTab === 'gastos' && (
        <div className="overflow-x-auto custom-scrollbar max-h-[400px]">
          <table className="w-full text-left">
<<<<<<< HEAD
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase backdrop-blur-sm sticky top-0 z-10">
=======
            <thead className="bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Descrição</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Valor</th>
                <th className="px-6 py-4 text-center font-semibold tracking-wider">Ações</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-white/5">
              {sortedGastos.map(({ g, index }) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-300">
=======
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedGastos.map(({ g, index }) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
                    {formatDate(g.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-200">{g.desc}</td>
                  <td className="px-6 py-4">
<<<<<<< HEAD
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-slate-300 rounded text-xs shadow-sm">
=======
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
                      {g.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-rose-400">
                    {formatCurrency(g.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteGasto(index)}
                      className="text-slate-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rendas' && (
        <div className="overflow-x-auto custom-scrollbar max-h-[400px]">
          <table className="w-full text-left">
<<<<<<< HEAD
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase backdrop-blur-sm sticky top-0 z-10">
=======
            <thead className="bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Descrição</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Valor</th>
                <th className="px-6 py-4 text-center font-semibold tracking-wider">Ações</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-white/5">
              {sortedRendas.map(({ r, index }) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-300">
=======
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedRendas.map(({ r, index }) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
>>>>>>> 4a7e8d9 (feat: add tema claro e menu no mobile)
                    {formatDate(r.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-200">{r.desc}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-emerald-400">
                    {formatCurrency(r.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteRenda(index)}
                      className="text-slate-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
