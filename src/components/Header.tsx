'use client';

interface HeaderProps {
  month: number;
  year: number;
  yearOptions: number[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onOpenRecorrentes: () => void;
  onOpenRenda: () => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onImportCsv: (file: File) => void;
  onImportJson: (file: File) => void;
  onOpenImportPaste: () => void;
}

const MONTHS = [
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

export default function Header({
  month,
  year,
  yearOptions,
  onMonthChange,
  onYearChange,
  onOpenRecorrentes,
  onExportCsv,
  onExportJson,
  onImportCsv,
  onImportJson,
  onOpenImportPaste,
}: HeaderProps) {
  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportCsv(file);
      e.target.value = '';
    }
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      e.target.value = '';
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Controle Financeiro</h1>
        <p className="text-zinc-400">Gerencie suas finanças de forma simples e eficiente</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="flex bg-zinc-900/40 p-1 rounded-lg border border-white/5 backdrop-blur-sm mr-2 shadow-inner">
          <select
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="bg-transparent text-sm px-2 py-1 outline-none border-r border-white/10 text-zinc-200 cursor-pointer hover:text-white"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1} className="bg-zinc-900 text-zinc-200">
                {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="bg-transparent text-sm px-2 py-1 outline-none text-zinc-200 cursor-pointer hover:text-white"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y} className="bg-zinc-900 text-zinc-200">
                {y}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onOpenRecorrentes}
          className="bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 text-zinc-200 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm shadow-sm backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Recorrentes
        </button>
        <button
          onClick={onExportJson}
          title="Backup completo (recomendado)"
          className="bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 border border-violet-500/30 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm shadow-[0_0_10px_-3px_rgba(139,92,246,0.3)] backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Backup JSON
        </button>
        <button
          onClick={onExportCsv}
          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm shadow-[0_0_10px_-3px_rgba(59,130,246,0.3)] backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          CSV
        </button>
        <button
          type="button"
          onClick={onOpenImportPaste}
          title="Colar backup JSON"
          className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm shadow-[0_0_10px_-3px_rgba(16,185,129,0.3)] backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Colar JSON
        </button>
        <label className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400/90 border border-emerald-500/20 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm cursor-pointer backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Arquivo JSON
          <input type="file" accept=".json,application/json" className="hidden" onChange={handleJsonImport} />
        </label>
        <label className="bg-zinc-700/30 hover:bg-zinc-700/50 text-zinc-300 border border-white/10 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm cursor-pointer backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          CSV
          <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvImport} />
        </label>
      </div>
    </header>
  );
}
