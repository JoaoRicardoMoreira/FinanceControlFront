import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Recurrence, FinanceState, Filters, DEFAULT_METAS } from '@/types';
import { exportToCsv, importFromCsv } from '@/utils/helpers';

interface FinanceStore extends FinanceState {
  filters: Filters;

  // Actions
  addRenda: (renda: Transaction) => void;
  addGasto: (gasto: Transaction) => void;
  addRecurrence: (recorrente: Recurrence) => void;
  deleteGasto: (index: number) => void;
  deleteRenda: (index: number) => void;
  deleteRecurrence: (index: number) => void;
  setMeta: (categoria: string, valor: number) => void;
  setFilters: (filters: Partial<Filters>) => void;
  processRecurrences: () => void;
  exportCsv: () => void;
  importCsv: (file: File) => void;
  clearAll: () => void;
}

const initialState: FinanceState = {
  rendas: [],
  gastos: [],
  recorrentes: [],
  metas: { ...DEFAULT_METAS },
};

const currentDate = new Date();

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
          rendas: [...state.rendas, renda],
        })),

      addGasto: (gasto) =>
        set((state) => ({
          gastos: [...state.gastos, gasto],
        })),

      addRecurrence: (recorrente) =>
        set((state) => ({
          recorrentes: [...state.recorrentes, { ...recorrente, lastProcessed: '' }],
        })),

      deleteGasto: (index) =>
        set((state) => ({
          gastos: state.gastos.filter((_, i) => i !== index),
        })),

      deleteRenda: (index) =>
        set((state) => ({
          rendas: state.rendas.filter((_, i) => i !== index),
        })),

      deleteRecurrence: (index) =>
        set((state) => ({
          recorrentes: state.recorrentes.filter((_, i) => i !== index),
        })),

      setMeta: (categoria, valor) =>
        set((state) => ({
          metas: { ...state.metas, [categoria]: valor },
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      processRecurrences: () => {
        const state = get();
        const now = new Date();
        const currentMonthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        let hasChanges = false;
        const updatedRecorrentes: Recurrence[] = [];
        const newGastos: Transaction[] = [];
        const newRendas: Transaction[] = [];

        state.recorrentes.forEach((rec) => {
          if (rec.lastProcessed !== currentMonthYear) {
            // Create transaction for this month
            const dia = String(rec.dia).padStart(2, '0');
            const data = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${dia}`;

            if (rec.tipo === 'gasto') {
              newGastos.push({
                desc: `[REC] ${rec.desc}`,
                valor: rec.valor,
                data,
                categoria: rec.categoria,
              });
            } else {
              newRendas.push({
                desc: `[REC] ${rec.desc}`,
                valor: rec.valor,
                data,
              });
            }

            updatedRecorrentes.push({ ...rec, lastProcessed: currentMonthYear });
            hasChanges = true;
          } else {
            updatedRecorrentes.push(rec);
          }
        });

        if (hasChanges) {
          set((state) => ({
            gastos: [...state.gastos, ...newGastos],
            rendas: [...state.rendas, ...newRendas],
            recorrentes: updatedRecorrentes,
          }));
        }
      },

      exportCsv: () => {
        const state = get();
        exportToCsv(state.rendas, state.gastos);
      },

      importCsv: (file: File) => {
        importFromCsv(file, (rendas, gastos) => {
          set({ rendas, gastos });
        });
      },

      clearAll: () => set(initialState),
    }),
    {
      name: 'finance-storage',
      onRehydrateStorage: () => (state) => {
        // Process recurrences after rehydration
        if (state) {
          state.processRecurrences();
        }
      },
    }
  )
);

