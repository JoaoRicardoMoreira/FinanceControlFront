import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Transaction,
  Recurrence,
  FinanceState,
  Filters,
  DEFAULT_METAS,
  DEFAULT_INVESTMENT_CONFIG,
  NewTransaction,
  NewRecurrence,
  FinanceBackup,
} from '@/types';
import { exportToCsv } from '@/utils/helpers';
import {
  applyBackup,
  buildBackup,
  downloadJsonBackup,
  ImportMode,
} from '@/utils/backup';
import { createId, ensureRecurrence, ensureTransaction } from '@/utils/ids';
import { buildCarryOverCopy, cleanDescription } from '@/utils/carryOver';

interface FinanceStore extends FinanceState {
  filters: Filters;

  addRenda: (renda: NewTransaction) => void;
  addGasto: (gasto: NewTransaction) => void;
  carryOverGasto: (id: string) => void;
  updateRenda: (transaction: Transaction) => void;
  updateGasto: (transaction: Transaction) => void;
  addRecurrence: (recorrente: NewRecurrence) => void;
  deleteGasto: (id: string) => void;
  deleteRenda: (id: string) => void;
  deleteRecurrence: (id: string) => void;
  setMeta: (categoria: string, valor: number) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setInvestimentoConfig: (taxaMensalPercent: number) => void;
  upsertInvestimento: (month: number, year: number, valor: number) => void;
  deleteInvestimento: (id: string) => void;
  exportCsv: () => void;
  exportJson: () => void;
  applyImport: (backup: FinanceBackup, mode: ImportMode) => void;
  clearAll: () => void;
}

const initialState: FinanceState = {
  rendas: [],
  gastos: [],
  recorrentes: [],
  metas: { ...DEFAULT_METAS },
  investimentos: [],
  investimentoConfig: { ...DEFAULT_INVESTMENT_CONFIG },
};

const currentDate = new Date();

function normalizeRecurrence(rec: Recurrence & { dia?: number; lastProcessed?: string }): Recurrence {
  const { dia: _dia, lastProcessed: _lp, ...rest } = rec;
  return ensureRecurrence(rest as Recurrence);
}

function normalizeTransaction(
  t: Transaction & { parcelamentoId?: string; parcela?: number; totalParcelas?: number }
): Transaction {
  const { parcelamentoId: _p, parcela: _a, totalParcelas: _t, ...rest } = t;
  return ensureTransaction({
    ...rest,
    desc: cleanDescription(rest.desc),
  });
}

function migratePersistedState(state: FinanceStore): FinanceStore {
  return {
    ...state,
    rendas: state.rendas.map(normalizeTransaction),
    gastos: state.gastos.map(normalizeTransaction),
    recorrentes: state.recorrentes.map(normalizeRecurrence),
    investimentos: state.investimentos ?? [],
    investimentoConfig: state.investimentoConfig ?? { ...DEFAULT_INVESTMENT_CONFIG },
  };
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      filters: {
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      },

      addRenda: (renda) =>
        set((state) => ({
          rendas: [...state.rendas, ensureTransaction({ ...renda, id: createId() })],
        })),

      addGasto: (gasto) =>
        set((state) => ({
          gastos: [...state.gastos, ensureTransaction({ ...gasto, id: createId() })],
        })),

      carryOverGasto: (id) => {
        const state = get();
        const gasto = state.gastos.find((g) => g.id === id);
        if (!gasto) return;

        const copy = buildCarryOverCopy(gasto);
        set((s) => ({
          gastos: [...s.gastos, ensureTransaction({ ...copy, id: createId() })],
        }));
      },

      updateRenda: (transaction) =>
        set((state) => ({
          rendas: state.rendas.map((r) =>
            r.id === transaction.id ? transaction : r
          ),
        })),

      updateGasto: (transaction) =>
        set((state) => ({
          gastos: state.gastos.map((g) =>
            g.id === transaction.id ? transaction : g
          ),
        })),

      addRecurrence: (recorrente) =>
        set((state) => ({
          recorrentes: [
            ...state.recorrentes,
            ensureRecurrence({ ...recorrente, id: createId() }),
          ],
        })),

      deleteGasto: (id) =>
        set((state) => ({
          gastos: state.gastos.filter((g) => g.id !== id),
        })),

      deleteRenda: (id) =>
        set((state) => ({
          rendas: state.rendas.filter((r) => r.id !== id),
        })),

      deleteRecurrence: (id) =>
        set((state) => ({
          recorrentes: state.recorrentes.filter((r) => r.id !== id),
        })),

      setMeta: (categoria, valor) =>
        set((state) => ({
          metas: { ...state.metas, [categoria]: valor },
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      setInvestimentoConfig: (taxaMensalPercent) =>
        set((state) => ({
          investimentoConfig: { taxaMensalPercent: Math.max(0, taxaMensalPercent) },
        })),

      upsertInvestimento: (month, year, valor) =>
        set((state) => {
          const existing = state.investimentos.find(
            (i) => i.month === month && i.year === year
          );
          if (existing) {
            return {
              investimentos: state.investimentos.map((i) =>
                i.id === existing.id ? { ...i, valor: Math.max(0, valor) } : i
              ),
            };
          }
          return {
            investimentos: [
              ...state.investimentos,
              { id: createId(), month, year, valor: Math.max(0, valor) },
            ],
          };
        }),

      deleteInvestimento: (id) =>
        set((state) => ({
          investimentos: state.investimentos.filter((i) => i.id !== id),
        })),

      exportCsv: () => {
        const state = get();
        exportToCsv(state.rendas, state.gastos);
      },

      exportJson: () => {
        const state = get();
        downloadJsonBackup(buildBackup(state));
      },

      applyImport: (backup, mode) => {
        const state = get();
        const merged = applyBackup(state, backup, mode);
        set({
          rendas: merged.rendas,
          gastos: merged.gastos,
          recorrentes: merged.recorrentes,
          metas: merged.metas,
          investimentos: merged.investimentos,
          investimentoConfig: merged.investimentoConfig,
          filters: merged.filters,
        });
      },

      clearAll: () => set(initialState),
    }),
    {
      name: 'finance-storage',
      version: 3,
      migrate: (persisted, version) => {
        let state = migratePersistedState(persisted as FinanceStore);
        if (version < 2) {
          state = {
            ...state,
            recorrentes: state.recorrentes.map(normalizeRecurrence),
          };
        }
        if (version < 3) {
          state = {
            ...state,
            investimentos: state.investimentos ?? [],
            investimentoConfig: state.investimentoConfig ?? { ...DEFAULT_INVESTMENT_CONFIG },
          };
        }
        return state;
      },
    }
  )
);
