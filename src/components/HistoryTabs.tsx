'use client';

import { useState } from 'react';
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
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('gastos')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition ${
            activeTab === 'gastos'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-gray-400 hover:bg-gray-700/50'
          }`}
        >
          GASTOS
        </button>
        <button
          onClick={() => setActiveTab('rendas')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition ${
            activeTab === 'rendas'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-gray-400 hover:bg-gray-700/50'
          }`}
        >
          RENDAS
        </button>
      </div>

      {activeTab === 'gastos' && (
        <div className="overflow-x-auto custom-scrollbar max-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3">Categoria</th>
                <th className="px-6 py-3 text-right">Valor</th>
                <th className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedGastos.map(({ g, index }) => (
                <tr key={index} className="hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {formatDate(g.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{g.desc}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {g.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-rose-400">
                    {formatCurrency(g.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteGasto(index)}
                      className="text-gray-500 hover:text-rose-500 transition"
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
            <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3 text-right">Valor</th>
                <th className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedRendas.map(({ r, index }) => (
                <tr key={index} className="hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {formatDate(r.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{r.desc}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-emerald-400">
                    {formatCurrency(r.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteRenda(index)}
                      className="text-gray-500 hover:text-rose-500 transition"
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
    </div>
  );
}
