'use client';

import { useState, useCallback } from 'react';

interface ImportJsonPasteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (jsonText: string) => void;
}

export default function ImportJsonPasteModal({
  open,
  onClose,
  onSubmit,
}: ImportJsonPasteModalProps) {
  const [text, setText] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) setText(content);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-white/10 w-full max-w-2xl shadow-2xl backdrop-blur-xl max-h-[90vh] flex flex-col">
        <h3 className="text-2xl font-bold mb-2 text-slate-100">Importar JSON</h3>
        <p className="text-slate-400 text-sm mb-4">
          Cole o backup exportado pelo app ou arraste o arquivo <code className="text-emerald-400">.json</code>{' '}
          aqui.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex-1 min-h-0 mb-4 rounded-xl border-2 border-dashed transition ${
            dragOver
              ? 'border-emerald-500/50 bg-emerald-500/10'
              : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='{"version":2,"rendas":[],"gastos":[],...}'
            spellCheck={false}
            className="w-full h-48 md:h-64 bg-transparent p-4 outline-none text-slate-200 text-sm font-mono resize-none placeholder:text-zinc-600"
          />
        </div>

        <label className="block text-xs text-zinc-500 mb-4 cursor-pointer hover:text-zinc-400">
          <span className="underline">Ou escolher arquivo</span>
          <input
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setText('');
              onClose();
            }}
            className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl transition border border-white/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSubmit(text.trim())}
            disabled={!text.trim()}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
