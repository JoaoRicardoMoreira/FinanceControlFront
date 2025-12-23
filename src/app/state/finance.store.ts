import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Filters } from '../models/filters';
import { DEFAULT_METAS, FinanceState, initialState } from '../models/finance-state';
import { Recurrence } from '../models/recurrence';
import { Transaction } from '../models/transaction';
import { formatDateIso } from '../utils/format';

// Controle de persistência em localStorage.
// Deixe "true" para salvar/carregar o estado entre sessões.
const ENABLE_PERSISTENCE = true;
const STORAGE_KEY = 'financeDataV5';

@Injectable({ providedIn: 'root' })
export class FinanceStore {
  private state$ = new BehaviorSubject<FinanceState>(initialState);
  private filters$ = new BehaviorSubject<Filters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  readonly view$ = combineLatest([this.state$, this.filters$]).pipe(
    map(([state, filters]) => {
      const filtered = this.filterData(state, filters);
      const totalRenda = filtered.rendas.reduce((acc, r) => acc + r.valor, 0);
      const totalGasto = filtered.gastos.reduce((acc, g) => acc + g.valor, 0);
      const saldo = totalRenda - totalGasto;
      const metaGlobal = Object.values(state.metas).reduce((acc, m) => acc + m, 0);
      const categories = Object.keys(state.metas);
      const gastosPorCat = categories.map((cat) =>
        filtered.gastos.filter((g) => g.categoria === cat).reduce((acc, g) => acc + g.valor, 0),
      );
      const metasPorCat = categories.map((cat) => state.metas[cat]);
      return {
        state,
        filters,
        filtered,
        summary: { totalRenda, totalGasto, saldo, metaGlobal },
        charts: { categories, gastosPorCat, metasPorCat },
      };
    }),
  );

  constructor() {
    const loaded = this.load();
    this.state$.next(loaded);
    this.processRecurrents();
  }

  setFilters(filters: Partial<Filters>) {
    this.filters$.next({ ...this.filters$.value, ...filters });
  }

  addExpense(expense: Transaction) {
    const state = this.state$.value;
    this.updateState({ gastos: [...state.gastos, expense] });
  }

  addIncome(income: Transaction) {
    const state = this.state$.value;
    this.updateState({ rendas: [...state.rendas, income] });
  }

  addRecurrence(rec: Recurrence) {
    const state = this.state$.value;
    this.updateState({ recorrentes: [...state.recorrentes, { ...rec, lastProcessed: '' }] });
    this.processRecurrents();
  }

  deleteRecurrence(index: number) {
    const state = this.state$.value;
    const next = [...state.recorrentes];
    next.splice(index, 1);
    this.updateState({ recorrentes: next });
  }

  deleteItem(type: 'rendas' | 'gastos', index: number) {
    const state = this.state$.value;
    const next = [...state[type]];
    next.splice(index, 1);
    this.updateState({ [type]: next } as Partial<FinanceState>);
  }

  setMeta(category: string, value: number) {
    const state = this.state$.value;
    this.updateState({ metas: { ...state.metas, [category]: value } });
  }

  resetMetasToDefault() {
    this.updateState({ metas: { ...DEFAULT_METAS } });
  }

  overwriteData(rendas: Transaction[], gastos: Transaction[]) {
    const state = this.state$.value;
    this.updateState({ rendas, gastos, metas: state.metas });
  }

  private updateState(partial: Partial<FinanceState>) {
    const next = { ...this.state$.value, ...partial };
    this.state$.next(next);
    this.persist(next);
  }

  private filterData(state: FinanceState, filters: Filters) {
    const { month, year } = filters;
    const filterFn = (item: Transaction) => {
      if (month === 'all') return true;
      const d = new Date(`${item.data}T00:00:00`);
      return d.getMonth() === month && d.getFullYear() === year;
    };
    return {
      rendas: state.rendas.filter(filterFn),
      gastos: state.gastos.filter(filterFn),
    };
  }

  private processRecurrents() {
    const now = new Date();
    const currentMonthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const state = this.state$.value;
    let added = false;

    const updatedRec = state.recorrentes.map((rec) => {
      if (rec.lastProcessed !== currentMonthYear) {
        const data = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(rec.dia).padStart(2, '0')}`;
        if (rec.type === 'gasto') {
          state.gastos.push({ desc: `[REC] ${rec.desc}`, valor: rec.valor, data, categoria: rec.categoria });
        } else {
          state.rendas.push({ desc: `[REC] ${rec.desc}`, valor: rec.valor, data });
        }
        added = true;
        return { ...rec, lastProcessed: currentMonthYear };
      }
      return rec;
    });

    if (added) {
      this.updateState({ gastos: state.gastos, rendas: state.rendas, recorrentes: updatedRec });
    }
  }

  private persist(state: FinanceState) {
    if (!ENABLE_PERSISTENCE) {
      return;
    }
    try {
      const serialized = JSON.stringify(state);
      console.log('Salvando dados de finanças no localStorage:', serialized);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
      // Não deixa a aplicação quebrar por erro de storage/quota/serialização
      console.error('Falha ao salvar dados de finanças no localStorage:', e);
    }
  }

  private load(): FinanceState {
    if (!ENABLE_PERSISTENCE) {
      return initialState;
    }
    const saved =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem('financeDataV4') ||
      localStorage.getItem('financeDataV3') ||
      localStorage.getItem('financeDataV2') ||
      localStorage.getItem('financeData');

    if (!saved) return initialState;

    try {
      const parsed = JSON.parse(saved);

      // Garantir formatos mínimos válidos
      const rendasRaw: any[] = Array.isArray(parsed.rendas) ? parsed.rendas : [];
      const gastosRaw: any[] = Array.isArray(parsed.gastos) ? parsed.gastos : [];
      const recorrentesRaw: any[] = Array.isArray(parsed.recorrentes) ? parsed.recorrentes : [];
      const metasRaw: any = typeof parsed.metas === 'object' && parsed.metas !== null ? parsed.metas : {};

      const rendas: Transaction[] = rendasRaw
        .filter((r) => r && typeof r.valor === 'number' && typeof r.desc === 'string' && typeof r.data === 'string')
        .map((r) => ({
          desc: r.desc,
          valor: r.valor,
          data: r.data,
        }));

      const gastos: Transaction[] = gastosRaw
        .filter(
          (g) =>
            g &&
            typeof g.valor === 'number' &&
            typeof g.desc === 'string' &&
            typeof g.data === 'string' &&
            typeof g.categoria === 'string',
        )
        .map((g) => ({
          desc: g.desc,
          valor: g.valor,
          data: g.data,
          categoria: g.categoria,
        }));

      const recorrentes: Recurrence[] = recorrentesRaw
        .filter(
          (r) =>
            r &&
            (r.type === 'gasto' || r.type === 'renda') &&
            typeof r.desc === 'string' &&
            typeof r.valor === 'number' &&
            typeof r.dia === 'number',
        )
        .map((r) => ({
          type: r.type,
          desc: r.desc,
          valor: r.valor,
          dia: r.dia,
          categoria: r.categoria,
          lastProcessed: typeof r.lastProcessed === 'string' ? r.lastProcessed : '',
        }));

      const mergedMetas = { ...DEFAULT_METAS };
      for (const key of Object.keys(metasRaw)) {
        const v = metasRaw[key];
        if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
          mergedMetas[key] = v;
        }
      }

      const loaded: FinanceState = {
        rendas,
        gastos,
        recorrentes,
        metas: mergedMetas,
      };

      // Compatibilidade com a versão bem antiga (renda única)
      if (typeof (parsed as any).renda === 'number') {
        loaded.rendas =
          (parsed as any).renda > 0
            ? [
                {
                  desc: 'Renda Inicial',
                  valor: (parsed as any).renda,
                  data: formatDateIso(new Date()),
                },
              ]
            : [];
      }

      return loaded;
    } catch (e) {
      console.error('Erro ao carregar dados de finanças, limpando estado:', e);
      // Se der erro no parse, limpa tudo que for nosso
      localStorage.removeItem(STORAGE_KEY);
      return initialState;
    }
  }
}

