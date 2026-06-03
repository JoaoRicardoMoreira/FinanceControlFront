import {
  BACKUP_VERSION,
  DEFAULT_INVESTMENT_CONFIG,
  FinanceBackup,
  FinanceState,
  Filters,
  InvestmentContribution,
  InvestmentConfig,
  Recurrence,
  Transaction,
} from '@/types';
import { createId, ensureRecurrence, ensureTransaction } from '@/utils/ids';

export type ImportMode = 'replace' | 'merge';

export function buildBackup(
  state: FinanceState & { filters?: Filters }
): FinanceBackup {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    rendas: state.rendas.map(ensureTransaction),
    gastos: state.gastos.map(ensureTransaction),
    recorrentes: state.recorrentes.map(ensureRecurrence),
    metas: { ...state.metas },
    investimentos: state.investimentos.map((i) => ({ ...i })),
    investimentoConfig: { ...state.investimentoConfig },
    filters: state.filters,
  };
}

export function parseBackupFile(text: string): FinanceBackup {
  const parsed = JSON.parse(text) as Partial<FinanceBackup>;

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Arquivo inválido.');
  }

  if (parsed.version !== BACKUP_VERSION && parsed.version !== 1) {
    throw new Error('Versão do backup não suportada.');
  }

  if (!Array.isArray(parsed.rendas) || !Array.isArray(parsed.gastos)) {
    throw new Error('Estrutura do backup incompleta.');
  }

  return {
    version: BACKUP_VERSION,
    exportedAt: parsed.exportedAt ?? new Date().toISOString(),
    rendas: parsed.rendas.map((t) => ensureTransaction(t as Transaction)),
    gastos: parsed.gastos.map((t) => ensureTransaction(t as Transaction)),
    recorrentes: (parsed.recorrentes ?? []).map((r) =>
      ensureRecurrence(r as Recurrence)
    ),
    metas: parsed.metas ?? {},
    investimentos: (parsed.investimentos ?? []) as InvestmentContribution[],
    investimentoConfig: parsed.investimentoConfig ?? { ...DEFAULT_INVESTMENT_CONFIG },
    filters: parsed.filters,
  };
}

export function mergeTransactions(
  current: Transaction[],
  incoming: Transaction[]
): Transaction[] {
  const map = new Map(current.map((t) => [t.id, t]));
  incoming.forEach((t) => map.set(t.id, t));
  return Array.from(map.values());
}

export function mergeRecurrences(
  current: Recurrence[],
  incoming: Recurrence[]
): Recurrence[] {
  const map = new Map(current.map((r) => [r.id, r]));
  incoming.forEach((r) => map.set(r.id, r));
  return Array.from(map.values());
}

export function mergeInvestments(
  current: InvestmentContribution[],
  incoming: InvestmentContribution[]
): InvestmentContribution[] {
  const map = new Map(current.map((i) => [`${i.year}-${i.month}`, i]));
  incoming.forEach((i) => map.set(`${i.year}-${i.month}`, i));
  return Array.from(map.values());
}

export function applyBackup(
  current: FinanceState & { filters: Filters },
  backup: FinanceBackup,
  mode: ImportMode
): FinanceState & { filters: Filters } {
  const backupInvestimentos = backup.investimentos ?? [];
  const backupConfig = backup.investimentoConfig ?? { ...DEFAULT_INVESTMENT_CONFIG };

  if (mode === 'replace') {
    return {
      rendas: backup.rendas,
      gastos: backup.gastos,
      recorrentes: backup.recorrentes,
      metas: { ...backup.metas },
      investimentos: backupInvestimentos,
      investimentoConfig: { ...backupConfig },
      filters: backup.filters ?? current.filters,
    };
  }

  return {
    rendas: mergeTransactions(current.rendas, backup.rendas),
    gastos: mergeTransactions(current.gastos, backup.gastos),
    recorrentes: mergeRecurrences(current.recorrentes, backup.recorrentes),
    metas: { ...current.metas, ...backup.metas },
    investimentos: mergeInvestments(current.investimentos, backupInvestimentos),
    investimentoConfig: backupConfig,
    filters: current.filters,
  };
}

export function downloadJsonBackup(backup: FinanceBackup): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json;charset=utf-8;',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().split('T')[0];

  link.setAttribute('href', url);
  link.setAttribute('download', `finance-control-backup-${date}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function readBackupFile(file: File): Promise<FinanceBackup> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        resolve(parseBackupFile(text));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Falha ao ler o backup.'));
      }
    };
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.readAsText(file);
  });
}

export function createTransaction(
  data: Omit<Transaction, 'id'> & { id?: string }
): Transaction {
  return { ...data, id: data.id ?? createId() };
}
