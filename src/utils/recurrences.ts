import { Recurrence } from '@/types';

/** Recorrências contam em todo mês — servem para planejamento, não para um dia fixo. */
export function sumRecurrencesByType(
  recorrentes: Recurrence[],
  tipo: 'renda' | 'gasto'
): number {
  return recorrentes
    .filter((r) => r.tipo === tipo)
    .reduce((sum, r) => sum + r.valor, 0);
}

export function recurrenceGastosByCategory(
  recorrentes: Recurrence[]
): Record<string, number> {
  return recorrentes
    .filter((r) => r.tipo === 'gasto')
    .reduce((acc, r) => {
      const cat = r.categoria || 'Outros';
      acc[cat] = (acc[cat] || 0) + r.valor;
      return acc;
    }, {} as Record<string, number>);
}

export function mergeCategoryTotals(
  actual: Record<string, number>,
  planned: Record<string, number>
): Record<string, number> {
  const keys = new Set([...Object.keys(actual), ...Object.keys(planned)]);
  const merged: Record<string, number> = {};
  keys.forEach((key) => {
    merged[key] = (actual[key] || 0) + (planned[key] || 0);
  });
  return merged;
}
