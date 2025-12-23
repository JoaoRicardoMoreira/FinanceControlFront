export type RecurrenceType = 'gasto' | 'renda';

export interface Recurrence {
  type: RecurrenceType;
  desc: string;
  valor: number;
  dia: number;
  categoria?: string;
  lastProcessed?: string; // YYYY-MM
}

