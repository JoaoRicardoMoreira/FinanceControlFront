import { Transaction } from '../models/transaction';

export interface CsvData {
  rendas: Transaction[];
  gastos: Transaction[];
}

export function toCsv(rendas: Transaction[], gastos: Transaction[]): string {
  const headers = ['Tipo', 'Data', 'Descrição', 'Categoria', 'Valor'];
  const rows = [
    ...rendas.map((r) => ['Renda', r.data, `"${r.desc}"`, '-', r.valor.toFixed(2)]),
    ...gastos.map((g) => ['Gasto', g.data, `"${g.desc}"`, g.categoria ?? '-', g.valor.toFixed(2)]),
  ];
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function parseCsv(text: string): CsvData {
  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  const rendas: Transaction[] = [];
  const gastos: Transaction[] = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (parts.length >= 5) {
      const item = {
        data: parts[1].trim(),
        desc: parts[2].replace(/^"|"$/g, '').trim(),
        valor: parseFloat(parts[4]),
      };
      if (parts[0].trim() === 'Renda') {
        rendas.push(item);
      } else {
        gastos.push({ ...item, categoria: parts[3].trim() });
      }
    }
  }
  return { rendas, gastos };
}

