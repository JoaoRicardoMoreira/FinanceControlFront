export interface Transaction {
  desc: string;
  valor: number;
  data: string; // YYYY-MM-DD
  categoria?: string;
}

export interface Recurrence {
  desc: string;
  valor: number;
  categoria?: string;
  tipo: 'renda' | 'gasto';
  dia: number; // Day of month (1-31)
  lastProcessed?: string; // YYYY-MM format
}

export type MetaMap = Record<string, number>;

export interface FinanceState {
  rendas: Transaction[];
  gastos: Transaction[];
  recorrentes: Recurrence[];
  metas: MetaMap;
}

export interface Filters {
  month: number;
  year: number;
}

export const DEFAULT_METAS: MetaMap = {
  'Alimentação': 0,
  'Transporte': 0,
  'Lazer': 0,
  'Saúde': 0,
  'Educação': 0,
  'Moradia': 0,
  'Outros': 0,
};

export const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Educação',
  'Moradia',
  'Outros',
];
