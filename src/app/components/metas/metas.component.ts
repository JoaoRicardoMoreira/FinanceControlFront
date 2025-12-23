import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetaMap } from '../../models/meta';
import { Transaction } from '../../models/transaction';
import { formatCurrency } from '../../utils/format';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metas.component.html',
})
export class MetasComponent {
  @Input() metas: MetaMap = {};
  @Input() gastos: Transaction[] = [];
  @Output() editMeta = new EventEmitter<string>();

  currency = formatCurrency;
  Math = Math;

  gastosPorCategoria(cat: string) {
    return this.gastos.filter((g) => g.categoria === cat).reduce((acc, g) => acc + g.valor, 0);
  }
}

