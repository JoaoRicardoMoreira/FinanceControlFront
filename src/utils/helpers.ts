import { Transaction } from '@/types';
import { createTransaction } from '@/utils/backup';

export const filterByMonth = (
  transactions: Transaction[],
  month: number,
  year: number
): Transaction[] => {
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString();
  return transactions.filter((t) => {
    const [tYear, tMonth] = t.data.split('-');
    return tYear === yearStr && tMonth === monthStr;
  });
};

export const sumTransactions = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, t) => sum + t.valor, 0);
};

export const groupByCategory = (
  transactions: Transaction[]
): Record<string, number> => {
  return transactions.reduce((acc, t) => {
    const cat = t.categoria || 'Outros';
    acc[cat] = (acc[cat] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const getYearOptions = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push(i);
  }
  return years;
};

export const exportToCsv = (rendas: Transaction[], gastos: Transaction[]): void => {
  const headers = 'Tipo,Id,Descrição,Valor,Data,Categoria\n';
  const rendasCsv = rendas
    .map((r) => `Renda,${r.id},"${r.desc}",${r.valor},${r.data},`)
    .join('\n');
  const gastosCsv = gastos
    .map((g) => `Gasto,${g.id},"${g.desc}",${g.valor},${g.data},"${g.categoria || ''}"`)
    .join('\n');

  const csv = headers + rendasCsv + '\n' + gastosCsv;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `financas_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function parseCsvText(text: string): { rendas: Transaction[]; gastos: Transaction[] } {
  const [headerLine, ...lines] = text.split('\n');
  const hasIdColumn = headerLine?.toLowerCase().includes('id') ?? false;
  const rendas: Transaction[] = [];
  const gastos: Transaction[] = [];

  lines.forEach((line) => {
    if (!line.trim()) return;

    const parts = line.split(',');
    const tipo = parts[0]?.trim();

    let desc: string;
    let valor: number;
    let data: string;
    let categoria: string | undefined;
    let id: string | undefined;

    if (hasIdColumn && parts.length >= 5) {
      id = parts[1].trim();
      desc = parts[2].replace(/"/g, '').trim();
      valor = parseFloat(parts[3].trim());
      data = parts[4].trim();
      categoria = parts[5]?.replace(/"/g, '').trim() || undefined;
    } else if (parts.length >= 4) {
      desc = parts[1].replace(/"/g, '').trim();
      valor = parseFloat(parts[2].trim());
      data = parts[3].trim();
      categoria = parts[4]?.replace(/"/g, '').trim() || undefined;
    } else {
      return;
    }

    if (tipo === 'Renda') {
      rendas.push(createTransaction({ id, desc, valor, data }));
    } else if (tipo === 'Gasto') {
      gastos.push(
        createTransaction({
          id,
          desc,
          valor,
          data,
          categoria: categoria ?? 'Outros',
        })
      );
    }
  });

  return { rendas, gastos };
}

export function readCsvFile(file: File): Promise<{ rendas: Transaction[]; gastos: Transaction[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(parseCsvText(e.target?.result as string));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Falha ao ler CSV.'));
      }
    };
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.readAsText(file);
  });
}
