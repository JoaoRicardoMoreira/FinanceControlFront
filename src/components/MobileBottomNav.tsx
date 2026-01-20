'use client';

interface MobileBottomNavProps {
  onOpenTransaction: () => void;
  onGoToConta: () => void;
  onGoToMetas: () => void;
  onGoToGraficos: () => void;
  onGoToOpenFinance: () => void;
}

export default function MobileBottomNav({
  onOpenTransaction,
  onGoToConta,
  onGoToMetas,
  onGoToGraficos,
  onGoToOpenFinance,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-2 py-2 md:hidden z-40">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Botão Metas */}
        <button
          onClick={onGoToMetas}
          className="flex flex-col items-center gap-0.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-[9px] font-medium">Metas</span>
        </button>

        {/* Botão Gráficos */}
        <button
          onClick={onGoToGraficos}
          className="flex flex-col items-center gap-0.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          <span className="text-[9px] font-medium">Gráficos</span>
        </button>

        {/* Botão Central - Nova Transação */}
        <button
          onClick={onOpenTransaction}
          className="relative -top-5 flex flex-col items-center"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3.5 rounded-full shadow-lg shadow-emerald-500/30 transition transform hover:scale-105 active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {/* Botão Bancos / Open Finance */}
        <button
          onClick={onGoToOpenFinance}
          className="flex flex-col items-center gap-0.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
        >
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
          <span className="text-[9px] font-medium">Bancos</span>
        </button>

        {/* Botão Conta */}
        <button
          onClick={onGoToConta}
          className="flex flex-col items-center gap-0.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[9px] font-medium">Conta</span>
        </button>
      </div>
    </nav>
  );
}
