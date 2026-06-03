import { NewTransaction, Transaction } from '@/types';

const INSTALLMENT_SUFFIX = /\s*\(\d+\/\d+\)\s*$/;

export function cleanDescription(desc: string): string {
  return desc.replace(INSTALLMENT_SUFFIX, '').trim();
}

/** Avança um mês mantendo o dia (ajusta se o dia não existir no mês). */
export function addMonthsToDate(dateStr: string, monthsToAdd: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1 + monthsToAdd, day);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Cópia independente no mês seguinte — sem vínculo de parcelas. */
export function buildCarryOverCopy(gasto: Transaction): NewTransaction {
  return {
    desc: cleanDescription(gasto.desc),
    valor: gasto.valor,
    data: addMonthsToDate(gasto.data, 1),
    categoria: gasto.categoria,
  };
}
