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
    <Card className="overflow-hidden">
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setActiveTab('gastos')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'gastos'
            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
            : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
            }`}
        >
          GASTOS
        </button>
        <button
          onClick={() => setActiveTab('rendas')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'rendas'
            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
            : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
            }`}
        >
          RENDAS
        </button>
      </div>

      {activeTab === 'gastos' && (
        <div className="overflow-x-auto custom-scrollbar max-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 text-zinc-400 text-xs uppercase backdrop-blur-sm sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Descrição</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Valor</th>
                <th className="px-6 py-4 text-center font-semibold tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedGastos.map(({ g, index }) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {formatDate(g.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-200">{g.desc}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded text-xs shadow-sm">
                      {g.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-rose-400">
                    {formatCurrency(g.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteGasto(index)}
                      className="text-zinc-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
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
            <thead className="bg-zinc-900/50 text-zinc-400 text-xs uppercase backdrop-blur-sm sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Data</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Descrição</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Valor</th>
                <th className="px-6 py-4 text-center font-semibold tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedRendas.map(({ r, index }) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {formatDate(r.data)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-200">{r.desc}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-emerald-400">
                    {formatCurrency(r.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteRenda(index)}
                      className="text-zinc-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
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
