'use client';

interface WelcomeImportProps {
  onImportFile: () => void;
  onImportPaste: () => void;
}

export default function WelcomeImport({ onImportFile, onImportPaste }: WelcomeImportProps) {
  return (
    <div className="mb-8 p-8 rounded-2xl border border-emerald-500/40 bg-zinc-900 shadow-lg shadow-black/30 text-center">
      <h2 className="text-xl font-bold text-slate-100 mb-2">Bem-vindo ao app</h2>
      <p className="text-zinc-400 text-sm mb-6 max-w-lg mx-auto">
        Nenhum dado carregado ainda. Importe um backup JSON para começar com os mesmos dados do
        navegador ou de outro dispositivo.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onImportPaste}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Colar JSON
        </button>
        <button
          type="button"
          onClick={onImportFile}
          className="bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-6 py-3 rounded-xl font-medium transition"
        >
          Escolher arquivo .json
        </button>
      </div>
      <p className="text-xs text-zinc-500 mt-4">
        Formato: backup com <code className="text-zinc-400">rendas</code>,{' '}
        <code className="text-zinc-400">gastos</code>,{' '}
        <code className="text-zinc-400">recorrentes</code>,{' '}
        <code className="text-zinc-400">metas</code> e opcionalmente{' '}
        <code className="text-zinc-400">investimentos</code>.
      </p>
    </div>
  );
}
