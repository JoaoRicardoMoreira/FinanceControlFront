import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { formatCurrency } from '../../utils/format';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html',
})
export class SummaryCardsComponent {
  @Input() saldo = 0;
  @Input() totalRenda = 0;
  @Input() totalGasto = 0;
  @Input() metaGlobal = 0;

  currency = formatCurrency;

  get saldoStatusClass() {
    return this.saldo >= 0
      ? 'mt-2 text-xs font-medium px-2 py-1 rounded-full inline-block bg-emerald-500/20 text-emerald-400'
      : 'mt-2 text-xs font-medium px-2 py-1 rounded-full inline-block bg-rose-500/20 text-rose-400';
  }

  get saldoStatusText() {
    return this.saldo >= 0 ? 'Saldo Positivo' : 'Saldo Negativo';
  }

  get progress() {
    return this.metaGlobal > 0 ? Math.min((this.totalGasto / this.metaGlobal) * 100, 100) : 0;
  }

  get progressClass() {
    const over = this.metaGlobal > 0 && this.totalGasto > this.metaGlobal;
    return over ? 'bg-rose-500 h-2 rounded-full transition-all duration-500' : 'bg-emerald-500 h-2 rounded-full transition-all duration-500';
  }
}

