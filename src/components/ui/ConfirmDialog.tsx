'use client';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmClass =
    variant === 'danger'
      ? 'bg-rose-600 hover:bg-rose-500 border-rose-500/50 hover:shadow-rose-500/25'
      : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50 hover:shadow-emerald-500/25';

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className="bg-slate-900/95 p-6 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl backdrop-blur-xl"
        role="alertdialog"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <h3 id="confirm-title" className="text-xl font-bold text-slate-100 mb-2">
          {title}
        </h3>
        <p id="confirm-message" className="text-slate-400 text-sm leading-relaxed mb-6">
          {message}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 text-white py-3 rounded-xl font-bold transition shadow-lg border ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
