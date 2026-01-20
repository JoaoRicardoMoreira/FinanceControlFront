'use client';

interface MobileBottomNavProps {
  onOpenGasto: () => void;
  onOpenRenda: () => void;
  onOpenRecorrentes: () => void;
  onOpenConta: () => void;
  onOpenFinance: () => void;
}

export default function MobileBottomNav({
  onOpenGasto,
  onOpenRenda,
  onOpenRecorrentes,
  onOpenConta,
  onOpenFinance,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-2 py-2 md:hidden z-40">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Botão Conta */}
        <button
          onClick={onOpenConta}
          className="flex flex-col items-center gap-1 p-1.5 text-blue-400 hover:text-blue-300 transition"
        >
          <div className="bg-blue-500/20 p-2 rounded-xl">
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
          </div>
          <span className="text-[10px] font-medium">Conta</span>
        </button>

        {/* Botão Renda */}
        <button
          onClick={onOpenRenda}
          className="flex flex-col items-center gap-1 p-1.5 text-emerald-400 hover:text-emerald-300 transition"
        >
          <div className="bg-emerald-500/20 p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-[10px] font-medium">Renda</span>
        </button>

        {/* Botão Central - Adicionar Gasto */}
        <button
          onClick={onOpenGasto}
          className="relative -top-4 flex flex-col items-center"
        >
          <div className="bg-rose-600 hover:bg-rose-700 p-4 rounded-full shadow-lg shadow-rose-600/30 transition transform hover:scale-105">
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
          <span className="text-[10px] font-medium text-rose-400 mt-1">Gasto</span>
        </button>

        {/* Botão Open Finance */}
        <button
          onClick={onOpenFinance}
          className="flex flex-col items-center gap-1 p-1.5 text-cyan-400 hover:text-cyan-300 transition"
        >
          <div className="bg-cyan-500/20 p-2 rounded-xl">
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
          </div>
          <span className="text-[10px] font-medium">Bancos</span>
        </button>

        {/* Botão Recorrentes */}
        <button
          onClick={onOpenRecorrentes}
          className="flex flex-col items-center gap-1 p-1.5 text-purple-400 hover:text-purple-300 transition"
        >
          <div className="bg-purple-500/20 p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <span className="text-[10px] font-medium">Recorrentes</span>
        </button>
      </div>
    </nav>
  );
}
