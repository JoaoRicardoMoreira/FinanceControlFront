import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChartsPanelComponent } from './components/charts-panel/charts-panel.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryTabsComponent } from './components/history-tabs/history-tabs.component';
import { MetasComponent } from './components/metas/metas.component';
import { MetaModalComponent } from './components/modals/meta-modal.component';
import { RecurrenceModalComponent } from './components/modals/recurrence-modal.component';
import { RendaModalComponent } from './components/modals/renda-modal.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { Recurrence } from './models/recurrence';
import { FinanceService } from './services/finance.service';
import { formatDateIso } from './utils/format';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    HeaderComponent,
    SummaryCardsComponent,
    ExpenseFormComponent,
    MetasComponent,
    ChartsPanelComponent,
    HistoryTabsComponent,
    RendaModalComponent,
    RecurrenceModalComponent,
    MetaModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  rendaModalOpen = false;
  recurrenceModalOpen = false;
  metaModalOpen = false;
  metaCategory = '';
  metaCurrentValue = 0;

  view$ = this.finance.view$;
  filtered$ = this.finance.filtered$;
  charts$ = this.finance.charts$;
  summary$ = this.finance.summary$;
  filters$ = this.finance.filters$;
  recorrentes$ = this.finance.recorrentes$;

  constructor(private finance: FinanceService) {}

  get yearOptions() {
    const current = new Date().getFullYear();
    const arr: number[] = [];
    for (let i = current - 5; i <= current + 5; i++) arr.push(i);
    return arr;
  }

  onAddExpense(event: { desc: string; valor: number; data: string; categoria: string }) {
    this.finance.addExpense(event);
  }

  onAddIncome(event: { desc: string; valor: number; data: string }) {
    this.finance.addIncome(event);
  }

  onAddRecurrence(event: Recurrence) {
    this.finance.addRecurrence(event);
  }

  deleteRecurrence(index: number) {
    this.finance.deleteRecurrence(index);
  }

  deleteItem(type: 'rendas' | 'gastos', index: number) {
    this.finance.deleteItem(type, index);
  }

  changeMonth(month: number | 'all') {
    this.finance.setFilters({ month });
  }

  changeYear(year: number) {
    this.finance.setFilters({ year });
  }

  openRendaModal() {
    this.rendaModalOpen = true;
  }

  openRecurrenceModal() {
    this.recurrenceModalOpen = true;
  }

  closeModals() {
    this.rendaModalOpen = false;
    this.recurrenceModalOpen = false;
    this.metaModalOpen = false;
  }

  openMetaModal(category: string, currentValue: number) {
    this.metaCategory = category;
    this.metaCurrentValue = currentValue;
    this.metaModalOpen = true;
  }

  saveMeta(value: number) {
    this.finance.setMeta(this.metaCategory, value);
  }

  exportCsv(rendas: any[], gastos: any[]) {
    this.finance.exportCsv(rendas, gastos);
  }

  async importCsv(file: File) {
    await this.finance.importCsv(file);
  }

  todayIso() {
    return formatDateIso(new Date());
  }
}
