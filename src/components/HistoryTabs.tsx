'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';
interface HistoryTabsProps {
  gastos: Transaction[];
  rendas: Transaction[];
  onEditGasto: (id: string) => void;
  onEditRenda: (id: string) => void;
  onDeleteGasto: (id: string) => void;
  onDeleteRenda: (id: string) => void;
  onCarryOverGasto: (id: string) => void;
}

export default function HistoryTabs({
  gastos,
  rendas,
  onEditGasto,
  onEditRenda,
  onDeleteGasto,
  onDeleteRenda,
  onCarryOverGasto,
}: HistoryTabsProps) {
  const [activeTab, setActiveTab] = useState<'gastos' | 'rendas'>('gastos');

  const sortedGastos = [...gastos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const sortedRendas = [...rendas].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

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
              {sortedGastos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-sm">
                    Nenhum gasto neste período
                  </td>
                </tr>
              ) : (
                sortedGastos.map((g) => (
                  <tr key={g.id} className="hover:bg-white/5 transition-colors">
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
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onCarryOverGasto(g.id)}
                          title="Levar para o próximo mês"
                          className="text-zinc-500 hover:text-amber-400 transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onEditGasto(g.id)}
                          title="Editar"
                          className="text-zinc-500 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteGasto(g.id)}
                          title="Excluir"
                          className="text-zinc-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
              {sortedRendas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">
                    Nenhuma renda neste período
                  </td>
                </tr>
              ) : (
                sortedRendas.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-zinc-300">
                      {formatDate(r.data)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-200">{r.desc}</td>
                    <td className="px-6 py-4 text-sm text-right font-bold text-emerald-400">
                      {formatCurrency(r.valor)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditRenda(r.id)}
                          title="Editar"
                          className="text-zinc-500 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteRenda(r.id)}
                          title="Excluir"
                          className="text-zinc-500 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-500/10 rounded-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
