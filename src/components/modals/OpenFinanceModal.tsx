'use client';

import { useState } from 'react';

interface OpenFinanceModalProps {
  open: boolean;
  onClose: () => void;
}

const BANKS = [
  { id: 'nubank', name: 'Nubank', color: 'bg-purple-600', logo: '💜' },
  { id: 'inter', name: 'Banco Inter', color: 'bg-orange-500', logo: '🧡' },
  { id: 'itau', name: 'Itaú', color: 'bg-orange-600', logo: '🔶' },
  { id: 'bradesco', name: 'Bradesco', color: 'bg-red-600', logo: '❤️' },
  { id: 'bb', name: 'Banco do Brasil', color: 'bg-yellow-500', logo: '💛' },
  { id: 'santander', name: 'Santander', color: 'bg-red-500', logo: '🔴' },
  { id: 'caixa', name: 'Caixa', color: 'bg-blue-600', logo: '💙' },
  { id: 'c6', name: 'C6 Bank', color: 'bg-gray-900', logo: '⬛' },
];

export default function OpenFinanceModal({ open, onClose }: OpenFinanceModalProps) {
  const [connectedBanks, setConnectedBanks] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (bankId: string) => {
    setConnecting(bankId);
    // Simula conexão
    setTimeout(() => {
      setConnectedBanks((prev) => [...prev, bankId]);
      setConnecting(null);
    }, 1500);
  };

  const handleDisconnect = (bankId: string) => {
    setConnectedBanks((prev) => prev.filter((id) => id !== bankId));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <span className="bg-cyan-500/20 text-cyan-400 p-1.5 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Open Finance
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Conecte suas contas bancárias para importar transações automaticamente.
        </p>

        {/* Bancos Conectados */}
        {connectedBanks.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bancos Conectados</h4>
            <div className="space-y-2">
              {connectedBanks.map((bankId) => {
                const bank = BANKS.find((b) => b.id === bankId);
                if (!bank) return null;
                return (
                  <div
                    key={bankId}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{bank.logo}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{bank.name}</span>
                    </div>
                    <button
                      onClick={() => handleDisconnect(bankId)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Desconectar
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lista de Bancos */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Adicionar Banco</h4>
          <div className="grid grid-cols-2 gap-3">
            {BANKS.filter((bank) => !connectedBanks.includes(bank.id)).map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleConnect(bank.id)}
                disabled={connecting === bank.id}
                className="flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-xl transition disabled:opacity-50"
              >
                <span className="text-2xl">{bank.logo}</span>
                <span className="text-sm text-gray-900 dark:text-white font-medium">{bank.name}</span>
                {connecting === bank.id && (
                  <span className="text-xs text-cyan-400">Conectando...</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {connectedBanks.length === BANKS.length && (
          <div className="mt-4 bg-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Todos os bancos estão conectados!</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 text-center mb-4">
            Seus dados são protegidos e criptografados. Utilizamos o padrão Open Finance do Banco Central.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-xl transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
