import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recurrence, RecurrenceType } from '../../models/recurrence';

@Component({
  selector: 'app-recurrence-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recurrence-modal.component.html',
})
export class RecurrenceModalComponent {
  @Input() open = false;
  @Input() recorrentes: Recurrence[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Recurrence>();
  @Output() delete = new EventEmitter<number>();

  form: Recurrence = {
    type: 'gasto',
    desc: '',
    valor: 0,
    dia: 1,
    categoria: 'Alimentação',
    lastProcessed: '',
  };

  categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia', 'Outros'];

  submit() {
    this.save.emit({ ...this.form, valor: Number(this.form.valor), dia: Number(this.form.dia) });
    this.form = { type: 'gasto', desc: '', valor: 0, dia: 1, categoria: 'Alimentação', lastProcessed: '' };
  }

  onTypeChange(type: RecurrenceType) {
    this.form.type = type;
  }
}

