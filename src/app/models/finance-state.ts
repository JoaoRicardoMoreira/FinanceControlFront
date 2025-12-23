import { MetaMap } from './meta';
import { Recurrence } from './recurrence';
import { Transaction } from './transaction';

export interface FinanceState {
  rendas: Transaction[];
  gastos: Transaction[];
  recorrentes: Recurrence[];
  metas: MetaMap;
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

export const initialState: FinanceState = {
  rendas: [],
  gastos: [],
  recorrentes: [],
  metas: { ...DEFAULT_METAS },
};

