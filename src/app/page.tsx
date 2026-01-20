'use client';

import { useEffect, useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import ExpenseForm from '@/components/ExpenseForm';
import Sidebar, { SidebarSection } from '@/components/Sidebar';
import ChartsPanel from '@/components/ChartsPanel';
import Metas from '@/components/Metas';
import OpenFinancePlaceholder from '@/components/OpenFinancePlaceholder';
import HistoryTabs from '@/components/HistoryTabs';
import RendaModal from '@/components/modals/RendaModal';
import RecurrenceModal from '@/components/modals/RecurrenceModal';
import MetaModal from '@/components/modals/MetaModal';
import GastoModal from '@/components/modals/GastoModal';
import ContaModal from '@/components/modals/ContaModal';
import OpenFinanceModal from '@/components/modals/OpenFinanceModal';
import MobileBottomNav from '@/components/MobileBottomNav';
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
    const [gastoModalOpen, setGastoModalOpen] = useState(false);
    const [contaModalOpen, setContaModalOpen] = useState(false);
    const [openFinanceModalOpen, setOpenFinanceModalOpen] = useState(false);
    const [metaCategory, setMetaCategory] = useState('');
    const [metaCurrentValue, setMetaCurrentValue] = useState(0);
    const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard');

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
        setGastoModalOpen(false);
        setContaModalOpen(false);
        setOpenFinanceModalOpen(false);
    };

    const handleExportCsv = () => {
        exportCsv();
    };

    const handleImportCsv = (file: File) => {
        importCsv(file);
    };

    return (
        <div className="flex min-h-screen text-slate-100">
            {/* Sidebar */}
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
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

                    {/* DASHBOARD VIEW */}
                    {activeSection === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
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
                                </div>
                                <div className="lg:col-span-2 space-y-8">
                                    <HistoryTabs
                                        gastos={filteredGastos}
                                        rendas={filteredRendas}
                                        onDeleteGasto={handleDeleteGasto}
                                        onDeleteRenda={handleDeleteRenda}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CHARTS VIEW */}
                    {activeSection === 'graficos' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-slate-100">Gráficos</h2>
                            </div>
                            <ChartsPanel
                                categories={chartData.categories}
                                gastosPorCat={chartData.gastosPorCat}
                                metasPorCat={chartData.metasPorCat}
                            />
                        </div>
                    )}

                    {/* METAS VIEW */}
                    {activeSection === 'metas' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-slate-100">Metas</h2>
                            </div>
                            <Metas
                                metas={metas}
                                gastos={filteredGastos}
                                onEditMeta={handleOpenMetaModal}
                            />
                        </div>
                    )}

                    {/* OPEN FINANCE VIEW */}
                    {activeSection === 'openfinance' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-slate-100">Open Finance</h2>
                                <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30 shadow-[0_0_10px_-2px_rgba(245,158,11,0.3)]">
                                    Em breve
                                </span>
                            </div>
                            <OpenFinancePlaceholder />
                        </div>
                    )}
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

            <GastoModal
                open={gastoModalOpen}
                onClose={closeModals}
                onSubmit={handleAddExpense}
                onOpenRenda={() => {
                    setGastoModalOpen(false);
                    setRendaModalOpen(true);
                }}
            />

            <ContaModal
                open={contaModalOpen}
                onClose={closeModals}
            />

            <OpenFinanceModal
                open={openFinanceModalOpen}
                onClose={closeModals}
            />

            <MobileBottomNav
                onOpenGasto={() => setGastoModalOpen(true)}
                onOpenRenda={() => setRendaModalOpen(true)}
                onOpenRecorrentes={() => setRecurrenceModalOpen(true)}
                onOpenConta={() => setContaModalOpen(true)}
                onOpenFinance={() => setOpenFinanceModalOpen(true)}
            />
        </div>
    );
}
