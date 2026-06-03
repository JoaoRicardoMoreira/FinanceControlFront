export interface Transaction {
  id: string;
  desc: string;
  valor: number;
  data: string; // YYYY-MM-DD
  categoria?: string;
}

export type NewTransaction = Omit<Transaction, 'id'>;

/** Item fixo mensal para planejamento — vale em todo mês, sem dia específico. */
export interface Recurrence {
  id: string;
  desc: string;
  valor: number;
  categoria?: string;
  tipo: 'renda' | 'gasto';
}

export type NewRecurrence = Omit<Recurrence, 'id'>;

export type MetaMap = Record<string, number>;

export interface InvestmentContribution {
  id: string;
  month: number;
  year: number;
  valor: number;
}

export interface InvestmentConfig {
  /** Taxa de rendimento mensal em % (ex.: 0.8 = 0,8% ao mês) */
  taxaMensalPercent: number;
}

export const DEFAULT_INVESTMENT_CONFIG: InvestmentConfig = {
  taxaMensalPercent: 0,
};

export interface FinanceState {
  rendas: Transaction[];
  gastos: Transaction[];
  recorrentes: Recurrence[];
  metas: MetaMap;
  investimentos: InvestmentContribution[];
  investimentoConfig: InvestmentConfig;
}

export interface Filters {
  month: number;
  year: number;
}

export const BACKUP_VERSION = 2 as const;

export interface FinanceBackup {
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  rendas: Transaction[];
  gastos: Transaction[];
  recorrentes: Recurrence[];
  metas: MetaMap;
  investimentos?: InvestmentContribution[];
  investimentoConfig?: InvestmentConfig;
  filters?: Filters;
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
