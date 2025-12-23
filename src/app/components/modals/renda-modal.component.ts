import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDateIso } from '../../utils/format';

@Component({
  selector: 'app-renda-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renda-modal.component.html',
})
export class RendaModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitRenda = new EventEmitter<{ desc: string; valor: number; data: string }>();

  form = {
    desc: '',
    valor: 0,
    data: formatDateIso(new Date()),
  };

  submit() {
    this.submitRenda.emit({ ...this.form, valor: Number(this.form.valor) });
    this.form = { desc: '', valor: 0, data: formatDateIso(new Date()) };
    this.close.emit();
  }
}

