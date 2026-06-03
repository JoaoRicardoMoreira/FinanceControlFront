import {
  InvestmentConfig,
  InvestmentContribution,
} from '@/types';

const MONTH_SHORT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

export function monthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

export function parseMonthKey(key: string): { year: number; month: number } {
  const [year, month] = key.split('-').map(Number);
  return { year, month };
}

export function formatMonthLabel(year: number, month: number): string {
  return `${MONTH_SHORT[month - 1]}/${year}`;
}

export function annualEquivalentPercent(monthlyPercent: number): number {
  if (monthlyPercent <= 0) return 0;
  const monthlyRate = monthlyPercent / 100;
  return (Math.pow(1 + monthlyRate, 12) - 1) * 100;
}

export function getContributionForMonth(
  investimentos: InvestmentContribution[],
  month: number,
  year: number
): InvestmentContribution | undefined {
  return investimentos.find((i) => i.month === month && i.year === year);
}

export function aporteForMonth(
  investimentos: InvestmentContribution[],
  month: number,
  year: number
): number {
  return getContributionForMonth(investimentos, month, year)?.valor ?? 0;
}

export function totalInvested(investimentos: InvestmentContribution[]): number {
  return investimentos.reduce((sum, i) => sum + i.valor, 0);
}

export interface PatrimonyPoint {
  key: string;
  year: number;
  month: number;
  label: string;
  aporte: number;
  patrimonio: number;
}

export interface PatrimonyTimeline {
  points: PatrimonyPoint[];
  totalAportado: number;
  patrimonioFinal: number;
  firstMonth: { year: number; month: number } | null;
}

function compareMonthKeys(a: string, b: string): number {
  return a.localeCompare(b);
}

function addOneMonth(year: number, month: number): { year: number; month: number } {
  if (month === 12) return { year: year + 1, month: 1 };
  return { year, month: month + 1 };
}

function listMonthRange(
  start: { year: number; month: number },
  end: { year: number; month: number }
): { year: number; month: number }[] {
  const result: { year: number; month: number }[] = [];
  let current = { ...start };
  const endKey = monthKey(end.year, end.month);

  while (monthKey(current.year, current.month) <= endKey) {
    result.push({ ...current });
    current = addOneMonth(current.year, current.month);
  }
  return result;
}

export function buildPatrimonyTimeline(
  investimentos: InvestmentContribution[],
  config: InvestmentConfig,
  endAt?: { year: number; month: number }
): PatrimonyTimeline {
  const withValue = investimentos.filter((i) => i.valor > 0);
  const totalAportado = totalInvested(investimentos);

  if (withValue.length === 0) {
    return { points: [], totalAportado, patrimonioFinal: 0, firstMonth: null };
  }

  const sorted = [...withValue].sort((a, b) => {
    const ka = monthKey(a.year, a.month);
    const kb = monthKey(b.year, b.month);
    return compareMonthKeys(ka, kb);
  });

  const first = sorted[0];
  const lastFromData = sorted[sorted.length - 1];
  const last =
    endAt &&
    compareMonthKeys(monthKey(endAt.year, endAt.month), monthKey(lastFromData.year, lastFromData.month)) >
      0
      ? endAt
      : { year: lastFromData.year, month: lastFromData.month };

  const aporteByKey = new Map<string, number>();
  investimentos.forEach((i) => {
    aporteByKey.set(monthKey(i.year, i.month), i.valor);
  });

  const months = listMonthRange(
    { year: first.year, month: first.month },
    last
  );

  const rate = config.taxaMensalPercent / 100;
  let patrimonio = 0;
  const points: PatrimonyPoint[] = [];

  months.forEach(({ year, month }) => {
    const key = monthKey(year, month);
    const aporte = aporteByKey.get(key) ?? 0;
    patrimonio = patrimonio * (1 + rate) + aporte;
    points.push({
      key,
      year,
      month,
      label: formatMonthLabel(year, month),
      aporte,
      patrimonio: Math.round(patrimonio * 100) / 100,
    });
  });

  return {
    points,
    totalAportado,
    patrimonioFinal: points.length > 0 ? points[points.length - 1].patrimonio : 0,
    firstMonth: { year: first.year, month: first.month },
  };
}
