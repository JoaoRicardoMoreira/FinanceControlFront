import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Filters } from '../models/filters';
import { Recurrence } from '../models/recurrence';
import { Transaction } from '../models/transaction';
import { parseCsv, toCsv } from '../utils/csv';
import { formatCurrency } from '../utils/format';
import { FinanceStore } from '../state/finance.store';

@Injectable({ providedIn: 'root' })
export class FinanceService {
  readonly view$ = this.store.view$;

  readonly summary$ = this.store.view$.pipe(map((v) => v.summary));
  readonly filters$ = this.store.view$.pipe(map((v) => v.filters));
  readonly metas$ = this.store.view$.pipe(map((v) => v.state.metas));
  readonly filtered$ = this.store.view$.pipe(map((v) => v.filtered));
  readonly charts$ = this.store.view$.pipe(map((v) => v.charts));
  readonly recorrentes$ = this.store.view$.pipe(map((v) => v.state.recorrentes));

  categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia', 'Outros'];

  constructor(private store: FinanceStore) {}

  setFilters(filters: Partial<Filters>) {
    this.store.setFilters(filters);
  }

  addExpense(expense: Transaction) {
    this.store.addExpense(expense);
  }

  addIncome(income: Transaction) {
    this.store.addIncome(income);
  }

  addRecurrence(rec: Recurrence) {
    this.store.addRecurrence(rec);
  }

  deleteRecurrence(index: number) {
    this.store.deleteRecurrence(index);
  }

  deleteItem(type: 'rendas' | 'gastos', index: number) {
    this.store.deleteItem(type, index);
  }

  setMeta(category: string, value: number) {
    this.store.setMeta(category, value);
  }

  exportCsv(rendas: Transaction[], gastos: Transaction[]) {
    const csvContent = toCsv(rendas, gastos);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `financas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  async importCsv(file: File) {
    const text = await file.text();
    const { rendas, gastos } = parseCsv(text);
    this.store.overwriteData(rendas, gastos);
  }

  currency(value: number) {
    return formatCurrency(value);
  }
}

