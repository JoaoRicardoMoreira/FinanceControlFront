'use client';

import { useEffect, useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import ExpenseForm from '@/components/ExpenseForm';
import Metas from '@/components/Metas';
import ChartsPanel from '@/components/ChartsPanel';
import HistoryTabs from '@/components/HistoryTabs';
import RendaModal from '@/components/modals/RendaModal';
import RecurrenceModal from '@/components/modals/RecurrenceModal';
import MetaModal from '@/components/modals/MetaModal';
import { filterByMonth, sumTransactions, groupByCategory } from '@/utils/helpers';
import { CATEGORIES } from '@/types';

export default function Home() {
    const {
        rendas,
        gastos,
        recorrentes,
        metas,
        filters,
        addRenda,
        addGasto,
        addRecurrence,
        deleteRenda,
        deleteGasto,
        deleteRecurrence,
        setMeta,
        setFilters,
        processRecurrences,
        exportCsv,
        importCsv,
    } = useFinanceStore();

    const [rendaModalOpen, setRendaModalOpen] = useState(false);
    const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(false);
    const [metaModalOpen, setMetaModalOpen] = useState(false);
    const [metaCategory, setMetaCategory] = useState('');
    const [metaCurrentValue, setMetaCurrentValue] = useState(0);

    // Process recurrences on mount
    useEffect(() => {
        processRecurrences();
    }, [processRecurrences]);

    // Year options for filter
    const yearOptions = useMemo(() => {
        const current = new Date().getFullYear();
        const arr: number[] = [];
        for (let i = current - 5; i <= current + 5; i++) arr.push(i);
        return arr;
    }, []);

    // Filtered data based on current filters
    const filteredRendas = useMemo(
        () => filterByMonth(rendas, filters.month, filters.year),
        [rendas, filters.month, filters.year]
    );

    const filteredGastos = useMemo(
        () => filterByMonth(gastos, filters.month, filters.year),
        [gastos, filters.month, filters.year]
    );

    // Summary calculations
    const totalRenda = useMemo(() => sumTransactions(filteredRendas), [filteredRendas]);
    const totalGasto = useMemo(() => sumTransactions(filteredGastos), [filteredGastos]);
    const saldo = totalRenda - totalGasto;
    const metaGlobal = useMemo(
        () => Object.values(metas).reduce((acc, m) => acc + m, 0),
        [metas]
    );

    // Chart data
    const gastosPorCategoria = useMemo(
        () => groupByCategory(filteredGastos),
        [filteredGastos]
    );

    const chartData = useMemo(() => {
        const categories = CATEGORIES;
        const gastosPorCat = categories.map((cat) => gastosPorCategoria[cat] || 0);
        const metasPorCat = categories.map((cat) => metas[cat] || 0);
        return { categories, gastosPorCat, metasPorCat };
    }, [gastosPorCategoria, metas]);

    // Handlers
    const handleAddExpense = (expense: { desc: string; valor: number; data: string; categoria: string }) => {
        addGasto(expense);
    };

    const handleAddIncome = (income: { desc: string; valor: number; data: string }) => {
        addRenda(income);
    };

    const handleAddRecurrence = (recurrence: any) => {
        addRecurrence(recurrence);
    };

    const handleDeleteRecurrence = (index: number) => {
        deleteRecurrence(index);
    };

    const handleDeleteGasto = (index: number) => {
        // Find the actual index in the full gastos array
        const item = filteredGastos[index];
        const actualIndex = gastos.findIndex(
            (g) => g.desc === item.desc && g.valor === item.valor && g.data === item.data
        );
        if (actualIndex !== -1) {
            deleteGasto(actualIndex);
        }
    };

    const handleDeleteRenda = (index: number) => {
        // Find the actual index in the full rendas array
        const item = filteredRendas[index];
        const actualIndex = rendas.findIndex(
            (r) => r.desc === item.desc && r.valor === item.valor && r.data === item.data
        );
        if (actualIndex !== -1) {
            deleteRenda(actualIndex);
        }
    };

    const handleOpenMetaModal = (category: string, currentValue: number) => {
        setMetaCategory(category);
        setMetaCurrentValue(currentValue);
        setMetaModalOpen(true);
    };

    const handleSaveMeta = (value: number) => {
        setMeta(metaCategory, value);
    };

    const closeModals = () => {
        setRendaModalOpen(false);
        setRecurrenceModalOpen(false);
        setMetaModalOpen(false);
    };

    const handleExportCsv = () => {
        exportCsv();
    };

    const handleImportCsv = (file: File) => {
        importCsv(file);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Header
                    month={filters.month}
                    year={filters.year}
                    yearOptions={yearOptions}
                    onMonthChange={(month) => setFilters({ month })}
                    onYearChange={(year) => setFilters({ year })}
                    onOpenRecorrentes={() => setRecurrenceModalOpen(true)}
                    onOpenRenda={() => setRendaModalOpen(true)}
                    onExportCsv={handleExportCsv}
                    onImportCsv={handleImportCsv}
                />

                <SummaryCards
                    saldo={saldo}
                    totalRenda={totalRenda}
                    totalGasto={totalGasto}
                    metaGlobal={metaGlobal}
                    onOpenRenda={() => setRendaModalOpen(true)}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <ExpenseForm onAddExpense={handleAddExpense} />
                        <Metas
                            metas={metas}
                            gastos={filteredGastos}
                            onEditMeta={handleOpenMetaModal}
                        />
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <ChartsPanel
                            categories={chartData.categories}
                            gastosPorCat={chartData.gastosPorCat}
                            metasPorCat={chartData.metasPorCat}
                        />

                        <HistoryTabs
                            gastos={filteredGastos}
                            rendas={filteredRendas}
                            onDeleteGasto={handleDeleteGasto}
                            onDeleteRenda={handleDeleteRenda}
                        />
                    </div>
                </div>
            </div>

            <RendaModal
                open={rendaModalOpen}
                onClose={closeModals}
                onSubmit={handleAddIncome}
            />

            <RecurrenceModal
                open={recurrenceModalOpen}
                recorrentes={recorrentes}
                onClose={closeModals}
                onSave={handleAddRecurrence}
                onDelete={handleDeleteRecurrence}
            />

            <MetaModal
                open={metaModalOpen}
                category={metaCategory}
                currentValue={metaCurrentValue}
                onClose={closeModals}
                onSave={handleSaveMeta}
            />
        </div>
    );
}
