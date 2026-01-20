import { Transaction } from '@/types';

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
  const headers = 'Tipo,Descrição,Valor,Data,Categoria\n';
  const rendasCsv = rendas
    .map((r) => `Renda,"${r.desc}",${r.valor},${r.data},`)
    .join('\n');
  const gastosCsv = gastos
    .map((g) => `Gasto,"${g.desc}",${g.valor},${g.data},"${g.categoria || ''}"`)
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
};

export const importFromCsv = (
  file: File,
  onSuccess: (rendas: Transaction[], gastos: Transaction[]) => void
): void => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const text = e.target?.result as string;
    const lines = text.split('\n').slice(1); // Skip header
    const rendas: Transaction[] = [];
    const gastos: Transaction[] = [];
    
    lines.forEach((line) => {
      if (!line.trim()) return;
      
      const parts = line.split(',');
      if (parts.length < 4) return;
      
      const tipo = parts[0].trim();
      const desc = parts[1].replace(/"/g, '').trim();
      const valor = parseFloat(parts[2].trim());
      const data = parts[3].trim();
      const categoria = parts[4]?.replace(/"/g, '').trim() || undefined;
      
      if (tipo === 'Renda') {
        rendas.push({ desc, valor, data });
      } else if (tipo === 'Gasto') {
        gastos.push({ desc, valor, data, categoria });
      }
    });
    
    onSuccess(rendas, gastos);
  };
  
  reader.readAsText(file);
};
