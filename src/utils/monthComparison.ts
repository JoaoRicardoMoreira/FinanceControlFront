import { Recurrence, Transaction } from '@/types';
import { groupByCategory, sumTransactions } from '@/utils/helpers';
import {
  mergeCategoryTotals,
  recurrenceGastosByCategory,
  sumRecurrencesByType,
} from '@/utils/recurrences';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export interface MonthPeriod {
  month: number;
  year: number;
}

export interface MetricComparison {
  current: number;
  previous: number;
  diff: number;
  percentChange: number | null;
}

export interface CategoryComparison {
  category: string;
  current: number;
  previous: number;
  diff: number;
  percentChange: number | null;
}

export interface MonthComparisonData {
  currentPeriod: MonthPeriod;
  previousPeriod: MonthPeriod;
  currentLabel: string;
  previousLabel: string;
  renda: MetricComparison;
  gasto: MetricComparison;
  saldo: MetricComparison;
  categories: CategoryComparison[];
}

export function getPreviousMonth(month: number, year: number): MonthPeriod {
  if (month === 1) {
    return { month: 12, year: year - 1 };
  }
  return { month: month - 1, year };
}

export function formatMonthYear(month: number, year: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function calcPercentChange(current: number, previous: number): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }
  return ((current - previous) / previous) * 100;
}

function buildMetric(current: number, previous: number): MetricComparison {
  return {
    current,
    previous,
    diff: current - previous,
    percentChange: calcPercentChange(current, previous),
  };
}

export function buildMonthComparison(params: {
  currentMonth: number;
  currentYear: number;
  currentRendas: Transaction[];
  currentGastos: Transaction[];
  previousRendas: Transaction[];
  previousGastos: Transaction[];
  recorrentes: Recurrence[];
  categories: string[];
}): MonthComparisonData {
  const {
    currentMonth,
    currentYear,
    currentRendas,
    currentGastos,
    previousRendas,
    previousGastos,
    recorrentes,
    categories,
  } = params;

  const previousPeriod = getPreviousMonth(currentMonth, currentYear);
  const fixaRenda = sumRecurrencesByType(recorrentes, 'renda');
  const fixaGasto = sumRecurrencesByType(recorrentes, 'gasto');
  const plannedByCat = recurrenceGastosByCategory(recorrentes);

  const currentRenda = sumTransactions(currentRendas) + fixaRenda;
  const previousRenda = sumTransactions(previousRendas) + fixaRenda;
  const currentGasto = sumTransactions(currentGastos) + fixaGasto;
  const previousGasto = sumTransactions(previousGastos) + fixaGasto;

  const currentByCat = mergeCategoryTotals(
    groupByCategory(currentGastos),
    plannedByCat
  );
  const previousByCat = mergeCategoryTotals(
    groupByCategory(previousGastos),
    plannedByCat
  );

  const categoryComparisons: CategoryComparison[] = categories
    .map((category) => {
      const current = currentByCat[category] || 0;
      const previous = previousByCat[category] || 0;
      return {
        category,
        current,
        previous,
        diff: current - previous,
        percentChange: calcPercentChange(current, previous),
      };
    })
    .filter((c) => c.current > 0 || c.previous > 0)
    .sort((a, b) => b.current - a.current);

  return {
    currentPeriod: { month: currentMonth, year: currentYear },
    previousPeriod,
    currentLabel: formatMonthYear(currentMonth, currentYear),
    previousLabel: formatMonthYear(previousPeriod.month, previousPeriod.year),
    renda: buildMetric(currentRenda, previousRenda),
    gasto: buildMetric(currentGasto, previousGasto),
    saldo: buildMetric(currentRenda - currentGasto, previousRenda - previousGasto),
    categories: categoryComparisons,
  };
}

export function formatPercentChange(value: number | null): string {
  if (value === null) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
