import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDateIso } from '../../utils/format';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
})
export class ExpenseFormComponent {
  @Output() addExpense = new EventEmitter<{ desc: string; valor: number; data: string; categoria: string }>();

  form = {
    desc: '',
    valor: 0,
    data: formatDateIso(new Date()),
    categoria: 'Alimentação',
  };

  categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia', 'Outros'];

  submit() {
    if (!this.form.desc || !this.form.data) return;
    this.addExpense.emit({ ...this.form, valor: Number(this.form.valor) });
    this.form = { desc: '', valor: 0, data: formatDateIso(new Date()), categoria: 'Alimentação' };
  }
}

