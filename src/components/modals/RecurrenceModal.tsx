'use client';

import { useState, useEffect } from 'react';
import { Recurrence, CATEGORIES } from '@/types';

interface RecurrenceModalProps {
    open: boolean;
    recorrentes: Recurrence[];
    onClose: () => void;
    onSave: (recurrence: Recurrence) => void;
    onDelete: (index: number) => void;
}

export default function RecurrenceModal({
    open,
    recorrentes,
    onClose,
    onSave,
    onDelete,
}: RecurrenceModalProps) {
    const [form, setForm] = useState<Recurrence>({
        tipo: 'gasto',
        desc: '',
        valor: 0,
        dia: 1,
        categoria: 'Alimentação',
    });

    useEffect(() => {
        if (!open) {
            setForm({
                tipo: 'gasto',
                desc: '',
                valor: 0,
                dia: 1,
                categoria: 'Alimentação',
            });
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.desc || !form.valor || !form.dia) return;

        onSave({
            ...form,
            valor: Number(form.valor),
            dia: Number(form.dia),
        });

        setForm({
            tipo: 'gasto',
            desc: '',
            valor: 0,
            dia: 1,
            categoria: 'Alimentação',
        });
    };

    const handleTypeChange = (tipo: 'gasto' | 'renda') => {
        setForm({ ...form, tipo });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Transações Recorrentes</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
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
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    className="bg-gray-700/30 p-4 rounded-xl border border-gray-600 mb-8 space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Tipo</label>
                            <select
                                value={form.tipo}
                                onChange={(e) => handleTypeChange(e.target.value as 'gasto' | 'renda')}
                                className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="gasto">Gasto Recorrente</option>
                                <option value="renda">Renda Recorrente</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Descrição</label>
                            <input
                                type="text"
                                value={form.desc}
                                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                required
                                placeholder="Ex: Aluguel, Internet, Salário..."
                                className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Valor (R$)</label>
                            <input
                                type="number"
                                value={form.valor || ''}
                                onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })}
                                step="0.01"
                                required
                                className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Dia do Vencimento</label>
                            <input
                                type="number"
                                value={form.dia}
                                onChange={(e) => setForm({ ...form, dia: Number(e.target.value) })}
                                min="1"
                                max="31"
                                required
                                className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        {form.tipo === 'gasto' && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Categoria</label>
                                <select
                                    value={form.categoria}
                                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                    className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition"
                    >
                        Salvar Recorrência
                    </button>
                </form>

                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                        Recorrências Ativas
                    </h4>
                    <div className="space-y-2">
                        {recorrentes.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Nenhuma recorrência cadastrada</p>
                        ) : (
                            recorrentes.map((rec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600"
                                >
                                    <div>
                                        <p className="font-bold text-sm">
                                            {rec.desc}{' '}
                                            <span className="text-xs font-normal text-gray-400">
                                                ({rec.tipo === 'gasto' ? 'Gasto' : 'Renda'})
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Dia {rec.dia} • R$ {rec.valor.toFixed(2)}
                                            {rec.tipo === 'gasto' && rec.categoria && ` • ${rec.categoria}`}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onDelete(i)}
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
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
