'use client';

import { useEffect } from 'react';
import { parseBackupFile } from '@/utils/backup';
import { FinanceBackup } from '@/types';

interface ImportFromUrlProps {
  onBackup: (backup: FinanceBackup) => void;
  onError: (message: string) => void;
}

/** Lê ?data= base64 do backup na URL (útil para atalhos / links curtos). */
export default function ImportFromUrl({ onBackup, onError }: ImportFromUrlProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');
    if (!encoded) return;

    try {
      const binary = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const json = new TextDecoder().decode(bytes);
      const backup = parseBackupFile(json);
      onBackup(backup);
      const url = new URL(window.location.href);
      url.searchParams.delete('data');
      window.history.replaceState({}, '', url.pathname + url.hash);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'JSON na URL inválido.');
    }
  }, [onBackup, onError]);

  return null;
}
