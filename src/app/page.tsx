'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import ExpenseForm from '@/components/ExpenseForm';
import Sidebar, { SidebarSection } from '@/components/Sidebar';
import ChartsPanel from '@/components/ChartsPanel';
import MonthComparison from '@/components/MonthComparison';
import Metas from '@/components/Metas';
import OpenFinancePlaceholder from '@/components/OpenFinancePlaceholder';
import HistoryTabs from '@/components/HistoryTabs';
import RendaModal from '@/components/modals/RendaModal';
import RecurrenceModal from '@/components/modals/RecurrenceModal';
import MetaModal from '@/components/modals/MetaModal';
import EditTransactionModal from '@/components/modals/EditTransactionModal';
import ImportBackupModal from '@/components/modals/ImportBackupModal';
import ImportJsonPasteModal from '@/components/modals/ImportJsonPasteModal';
import WelcomeImport from '@/components/WelcomeImport';
import ImportFromUrl from '@/components/ImportFromUrl';
import InvestmentAllocationModal from '@/components/modals/InvestmentAllocationModal';
import InvestmentsPanel from '@/components/InvestmentsPanel';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { filterByMonth, sumTransactions, groupByCategory, formatCurrency, readCsvFile } from '@/utils/helpers';
import { buildMonthComparison, getPreviousMonth } from '@/utils/monthComparison';
import { addMonthsToDate } from '@/utils/carryOver';
import { aporteForMonth, formatMonthLabel } from '@/utils/investments';
import {
    mergeCategoryTotals,
    recurrenceGastosByCategory,
    sumRecurrencesByType,
} from '@/utils/recurrences';
import { readBackupFile, parseBackupFile, ImportMode } from '@/utils/backup';
import {
    BACKUP_VERSION,
    CATEGORIES,
    FinanceBackup,
    NewRecurrence,
    NewTransaction,
    Transaction,
} from '@/types';

type PendingDelete =
    | { kind: 'gasto'; transaction: Transaction }
    | { kind: 'renda'; transaction: Transaction }
    | { kind: 'recurrence'; id: string; desc: string };

type EditingState = { kind: 'gasto' | 'renda'; transaction: Transaction };

export default function Home() {
    const {
        rendas,
        gastos,
        recorrentes,
        metas,
        investimentos,
        investimentoConfig,
        filters,
        addRenda,
        addGasto,
        carryOverGasto,
        updateRenda,
        updateGasto,
        addRecurrence,
        deleteRenda,
        deleteGasto,
        deleteRecurrence,
        setMeta,
        setFilters,
        setInvestimentoConfig,
        upsertInvestimento,
        deleteInvestimento,
        exportCsv,
        exportJson,
        applyImport,
    } = useFinanceStore();

    const [rendaModalOpen, setRendaModalOpen] = useState(false);
    const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(false);
    const [metaModalOpen, setMetaModalOpen] = useState(false);
    const [metaCategory, setMetaCategory] = useState('');
    const [metaCurrentValue, setMetaCurrentValue] = useState(0);
    const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard');

    const [editing, setEditing] = useState<EditingState | null>(null);
    const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
    const [pendingImport, setPendingImport] = useState<FinanceBackup | null>(null);
    const [importError, setImportError] = useState<string | null>(null);
    const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
    const [importPasteOpen, setImportPasteOpen] = useState(false);
    const [storeHydrated, setStoreHydrated] = useState(false);
    const jsonFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const unsub = useFinanceStore.persist.onFinishHydration(() => setStoreHydrated(true));
        if (useFinanceStore.persist.hasHydrated()) setStoreHydrated(true);
        return unsub;
    }, []);
    const yearOptions = useMemo(() => {
        const current = new Date().getFullYear();
        const arr: number[] = [];
        for (let i = current - 5; i <= current + 5; i++) arr.push(i);
        return arr;
    }, []);

    const filteredRendas = useMemo(
        () => filterByMonth(rendas, filters.month, filters.year),
        [rendas, filters.month, filters.year]
    );

    const filteredGastos = useMemo(
        () => filterByMonth(gastos, filters.month, filters.year),
        [gastos, filters.month, filters.year]
    );

    const rendaLancada = useMemo(() => sumTransactions(filteredRendas), [filteredRendas]);
    const gastoLancado = useMemo(() => sumTransactions(filteredGastos), [filteredGastos]);
    const rendaFixa = useMemo(() => sumRecurrencesByType(recorrentes, 'renda'), [recorrentes]);
    const gastoFixo = useMemo(() => sumRecurrencesByType(recorrentes, 'gasto'), [recorrentes]);
    const totalRenda = rendaLancada + rendaFixa;
    const totalGasto = gastoLancado + gastoFixo;
    const saldoBruto = totalRenda - totalGasto;
    const aporteMes = useMemo(
        () => aporteForMonth(investimentos, filters.month, filters.year),
        [investimentos, filters.month, filters.year]
    );
    const saldo = saldoBruto - aporteMes;
    const metaGlobal = useMemo(
        () => Object.values(metas).reduce((acc, m) => acc + m, 0),
        [metas]
    );

    const gastosPorCategoria = useMemo(
        () =>
            mergeCategoryTotals(
                groupByCategory(filteredGastos),
                recurrenceGastosByCategory(recorrentes)
            ),
        [filteredGastos, recorrentes]
    );

    const chartData = useMemo(() => {
        const categories = CATEGORIES;
        const gastosPorCat = categories.map((cat) => gastosPorCategoria[cat] || 0);
        const metasPorCat = categories.map((cat) => metas[cat] || 0);
        return { categories, gastosPorCat, metasPorCat };
    }, [gastosPorCategoria, metas]);

    const monthComparison = useMemo(() => {
        const previous = getPreviousMonth(filters.month, filters.year);
        const previousRendas = filterByMonth(rendas, previous.month, previous.year);
        const previousGastos = filterByMonth(gastos, previous.month, previous.year);

        return buildMonthComparison({
            currentMonth: filters.month,
            currentYear: filters.year,
            currentRendas: filteredRendas,
            currentGastos: filteredGastos,
            previousRendas,
            previousGastos,
            recorrentes,
            categories: CATEGORIES,
        });
    }, [rendas, gastos, recorrentes, filters.month, filters.year, filteredRendas, filteredGastos]);

    const findGasto = useCallback(
        (id: string) => gastos.find((g) => g.id === id),
        [gastos]
    );

    const findRenda = useCallback(
        (id: string) => rendas.find((r) => r.id === id),
        [rendas]
    );

    const handleAddExpense = (expense: NewTransaction) => {
        addGasto(expense);
    };

    const handleCarryOverGasto = (id: string) => {
        const gasto = findGasto(id);
        if (!gasto) return;
        carryOverGasto(id);
        const nextDate = addMonthsToDate(gasto.data, 1);
        const [year, month] = nextDate.split('-');
        setFilters({ month: Number(month), year: Number(year) });
    };

    const handleAddIncome = (income: NewTransaction) => {
        addRenda(income);
    };

    const handleAddRecurrence = (recurrence: NewRecurrence) => {
        addRecurrence(recurrence);
    };

    const handleRegisterInvestment = (valor: number) => {
        upsertInvestimento(filters.month, filters.year, valor);
        setInvestmentModalOpen(false);
    };

    const filterMonthLabel = formatMonthLabel(filters.year, filters.month);

    const handleRequestDeleteGasto = (id: string) => {
        const transaction = findGasto(id);
        if (transaction) setPendingDelete({ kind: 'gasto', transaction });
    };

    const handleRequestDeleteRenda = (id: string) => {
        const transaction = findRenda(id);
        if (transaction) setPendingDelete({ kind: 'renda', transaction });
    };

    const handleRequestDeleteRecurrence = (id: string) => {
        const rec = recorrentes.find((r) => r.id === id);
        if (rec) setPendingDelete({ kind: 'recurrence', id, desc: rec.desc });
    };

    const handleConfirmDelete = () => {
        if (!pendingDelete) return;

        if (pendingDelete.kind === 'gasto') {
            deleteGasto(pendingDelete.transaction.id);
        } else if (pendingDelete.kind === 'renda') {
            deleteRenda(pendingDelete.transaction.id);
        } else {
            deleteRecurrence(pendingDelete.id);
        }
        setPendingDelete(null);
    };

    const handleEditGasto = (id: string) => {
        const transaction = findGasto(id);
        if (transaction) setEditing({ kind: 'gasto', transaction });
    };

    const handleEditRenda = (id: string) => {
        const transaction = findRenda(id);
        if (transaction) setEditing({ kind: 'renda', transaction });
    };

    const handleSaveEdit = (transaction: Transaction) => {
        if (editing?.kind === 'gasto') {
            updateGasto(transaction);
        } else if (editing?.kind === 'renda') {
            updateRenda(transaction);
        }
        setEditing(null);
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

    const handleImportJson = async (file: File) => {
        try {
            setImportError(null);
            const backup = await readBackupFile(file);
            setPendingImport(backup);
        } catch (err) {
            setImportError(err instanceof Error ? err.message : 'Erro ao importar JSON.');
        }
    };

    const handleImportJsonText = (text: string) => {
        try {
            setImportError(null);
            const backup = parseBackupFile(text);
            setPendingImport(backup);
            setImportPasteOpen(false);
        } catch (err) {
            setImportError(err instanceof Error ? err.message : 'JSON inválido.');
        }
    };

    const handleUrlBackup = useCallback((backup: FinanceBackup) => {
        setImportError(null);
        setPendingImport(backup);
    }, []);

    const handleUrlImportError = useCallback((message: string) => {
        setImportError(message);
    }, []);

    const isDataEmpty =
        storeHydrated &&
        rendas.length === 0 &&
        gastos.length === 0 &&
        recorrentes.length === 0 &&
        investimentos.length === 0;

    const handleImportCsv = async (file: File) => {
        try {
            setImportError(null);
            const { rendas: r, gastos: g } = await readCsvFile(file);
            setPendingImport({
                version: BACKUP_VERSION,
                exportedAt: new Date().toISOString(),
                rendas: r,
                gastos: g,
                recorrentes: [],
                metas: { ...metas },
            });
        } catch (err) {
            setImportError(err instanceof Error ? err.message : 'Erro ao importar CSV.');
        }
    };

    const handleConfirmImport = (mode: ImportMode) => {
        if (pendingImport) {
            applyImport(pendingImport, mode);
            setPendingImport(null);
        }
    };

    const deleteDialogMessage = useMemo(() => {
        if (!pendingDelete) return '';

        if (pendingDelete.kind === 'recurrence') {
            return `Deseja excluir a recorrência "${pendingDelete.desc}"?`;
        }

        const { transaction } = pendingDelete;
        const tipo = pendingDelete.kind === 'gasto' ? 'gasto' : 'renda';
        return `Deseja excluir o ${tipo} "${transaction.desc}" (${formatCurrency(transaction.valor)})? Esta ação não pode ser desfeita.`;
    }, [pendingDelete]);

    return (
        <div className="flex min-h-screen text-slate-100">
            <ImportFromUrl onBackup={handleUrlBackup} onError={handleUrlImportError} />
            <input
                ref={jsonFileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleImportJson(file);
                    e.target.value = '';
                }}
            />
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

            <div className="flex-1 min-w-0 overflow-x-hidden relative z-10">
                <div className="container mx-auto px-4 py-8 pt-16 lg:pt-8 max-w-7xl">
                    {importError && (
                        <div className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                            {importError}
                        </div>
                    )}

                    <Header
                        month={filters.month}
                        year={filters.year}
                        yearOptions={yearOptions}
                        onMonthChange={(month) => setFilters({ month })}
                        onYearChange={(year) => setFilters({ year })}
                        onOpenRecorrentes={() => setRecurrenceModalOpen(true)}
                        onOpenRenda={() => setRendaModalOpen(true)}
                        onExportCsv={exportCsv}
                        onExportJson={exportJson}
                        onImportCsv={handleImportCsv}
                        onImportJson={handleImportJson}
                        onOpenImportPaste={() => setImportPasteOpen(true)}
                    />

                    {isDataEmpty && (
                        <WelcomeImport
                            onImportPaste={() => setImportPasteOpen(true)}
                            onImportFile={() => jsonFileInputRef.current?.click()}
                        />
                    )}

                    {activeSection === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <SummaryCards
                                saldo={saldo}
                                totalRenda={totalRenda}
                                totalGasto={totalGasto}
                                metaGlobal={metaGlobal}
                                rendaLancada={rendaLancada}
                                gastoLancado={gastoLancado}
                                rendaFixa={rendaFixa}
                                gastoFixo={gastoFixo}
                                aporteMes={aporteMes}
                                onOpenRenda={() => setRendaModalOpen(true)}
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setInvestmentModalOpen(true)}
                                    className="bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 border border-violet-500/30 px-5 py-2.5 rounded-xl transition flex items-center gap-2 text-sm font-medium shadow-[0_0_10px_-3px_rgba(139,92,246,0.3)]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Definir investimento do mês
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1 space-y-6">
                                    <ExpenseForm onAddExpense={handleAddExpense} />
                                </div>
                                <div className="lg:col-span-2 space-y-8">
                                    <HistoryTabs
                                        gastos={filteredGastos}
                                        rendas={filteredRendas}
                                        onEditGasto={handleEditGasto}
                                        onEditRenda={handleEditRenda}
                                        onDeleteGasto={handleRequestDeleteGasto}
                                        onDeleteRenda={handleRequestDeleteRenda}
                                        onCarryOverGasto={handleCarryOverGasto}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'graficos' && (
                        <div className="space-y-10 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-100">Gráficos</h2>
                            </div>
                            <MonthComparison data={monthComparison} />
                            <ChartsPanel
                                categories={chartData.categories}
                                gastosPorCat={chartData.gastosPorCat}
                                metasPorCat={chartData.metasPorCat}
                            />
                        </div>
                    )}

                    {activeSection === 'metas' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-slate-100">Metas</h2>
                            </div>
                            <Metas
                                metas={metas}
                                gastos={filteredGastos}
                                gastosPorCategoria={gastosPorCategoria}
                                onEditMeta={handleOpenMetaModal}
                            />
                        </div>
                    )}

                    {activeSection === 'investimentos' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-slate-100">Investimentos</h2>
                            </div>
                            <InvestmentsPanel
                                investimentos={investimentos}
                                investimentoConfig={investimentoConfig}
                                filterMonth={filters.month}
                                filterYear={filters.year}
                                onSetConfig={setInvestimentoConfig}
                                onUpsert={upsertInvestimento}
                                onDelete={deleteInvestimento}
                            />
                        </div>
                    )}

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
                onDelete={handleRequestDeleteRecurrence}
            />

            <MetaModal
                open={metaModalOpen}
                category={metaCategory}
                currentValue={metaCurrentValue}
                onClose={closeModals}
                onSave={handleSaveMeta}
            />

            <EditTransactionModal
                open={editing !== null}
                type={editing?.kind ?? 'gasto'}
                transaction={editing?.transaction ?? null}
                onClose={() => setEditing(null)}
                onSave={handleSaveEdit}
            />

            <InvestmentAllocationModal
                open={investmentModalOpen}
                saldoBruto={saldoBruto}
                aporteAtual={aporteMes}
                monthLabel={filterMonthLabel}
                onClose={() => setInvestmentModalOpen(false)}
                onConfirm={handleRegisterInvestment}
            />

            <ImportJsonPasteModal
                open={importPasteOpen}
                onClose={() => setImportPasteOpen(false)}
                onSubmit={handleImportJsonText}
            />

            <ImportBackupModal
                open={pendingImport !== null}
                backup={pendingImport}
                onClose={() => setPendingImport(null)}
                onConfirm={handleConfirmImport}
            />

            <ConfirmDialog
                open={pendingDelete !== null}
                title="Confirmar exclusão"
                message={deleteDialogMessage}
                confirmLabel="Excluir"
                variant="danger"
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
