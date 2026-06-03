'use client';

import { FinanceBackup } from '@/types';
import { ImportMode } from '@/utils/backup';

interface ImportBackupModalProps {
  open: boolean;
  backup: FinanceBackup | null;
  onClose: () => void;
  onConfirm: (mode: ImportMode) => void;
}

export default function ImportBackupModal({
  open,
  backup,
  onClose,
  onConfirm,
}: ImportBackupModalProps) {
  if (!open || !backup) return null;

  const exportedDate = backup.exportedAt
    ? new Date(backup.exportedAt).toLocaleString('pt-BR')
    : '—';

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-lg shadow-2xl backdrop-blur-xl">
        <h3 className="text-2xl font-bold mb-2 text-slate-100">Importar backup</h3>
        <p className="text-slate-400 text-sm mb-6">
          Escolha como aplicar os dados do arquivo JSON.
        </p>

        <div className="bg-white/5 rounded-xl border border-white/5 p-4 mb-6 text-sm space-y-2">
          <p className="text-slate-300">
            <span className="text-slate-500">Exportado em:</span> {exportedDate}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Rendas:</span> {backup.rendas.length}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Gastos:</span> {backup.gastos.length}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Recorrências:</span> {backup.recorrentes.length}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Investimentos:</span>{' '}
            {backup.investimentos?.length ?? 0}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => onConfirm('merge')}
            className="w-full text-left p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition"
          >
            <p className="font-semibold text-emerald-400">Mesclar</p>
            <p className="text-xs text-slate-400 mt-1">
              Mantém seus dados atuais e adiciona/atualiza itens pelo ID.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onConfirm('replace')}
            className="w-full text-left p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition"
          >
            <p className="font-semibold text-rose-400">Substituir tudo</p>
            <p className="text-xs text-slate-400 mt-1">
              Apaga rendas, gastos, recorrências, metas e investimentos atuais e usa só o backup.
            </p>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
