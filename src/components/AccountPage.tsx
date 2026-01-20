'use client';

import Card from '@/components/ui/Card';
import { useFinanceStore } from '@/store/financeStore';
import { useMemo } from 'react';

interface AccountPageProps {
  onExportCsv: () => void;
  onImportCsv: (file: File) => void;
}

export default function AccountPage({ onExportCsv, onImportCsv }: AccountPageProps) {
  const { rendas, gastos, recorrentes, clearAll } = useFinanceStore();

  const stats = useMemo(() => {
    const totalRendas = rendas.reduce((acc, r) => acc + r.valor, 0);
    const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    const totalRecorrentes = recorrentes.length;
    const transacoesTotal = rendas.length + gastos.length;

    return { totalRendas, totalGastos, totalRecorrentes, transacoesTotal };
  }, [rendas, gastos, recorrentes]);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportCsv(file);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
      clearAll();
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-blue-500/30">
            U
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usuário</h2>
            <p className="text-gray-500 dark:text-slate-400">usuario@email.com</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Plano Gratuito
              </span>
              <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                Membro desde Jan 2026
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Subscription Plans */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Planos de Assinatura
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Escolha o plano ideal para suas necessidades financeiras
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Free Plan */}
          <div className="relative p-5 bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-emerald-500/50">
            <div className="absolute -top-3 left-4">
              <span className="text-xs px-3 py-1 bg-emerald-500 text-white rounded-full font-medium">
                Atual
              </span>
            </div>
            <div className="mt-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Gratuito</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">R$ 0</span>
                <span className="text-gray-500 dark:text-slate-400">/mês</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Transações ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Metas por categoria
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Gráficos básicos
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Armazenamento local
                </li>
              </ul>
              <button
                disabled
                className="w-full mt-4 py-2.5 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium cursor-not-allowed"
              >
                Plano Atual
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative p-5 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="absolute -top-3 left-4">
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium">
                Popular
              </span>
            </div>
            <div className="mt-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Pro</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-purple-400">R$ 9,90</span>
                <span className="text-gray-500 dark:text-slate-400">/mês</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tudo do Gratuito
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sincronização em nuvem
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Relatórios avançados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Múltiplos dispositivos
                </li>
              </ul>
              <button
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25"
              >
                Assinar Pro
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div className="absolute -top-3 left-4">
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium">
                Completo
              </span>
            </div>
            <div className="mt-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Premium</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-amber-400">R$ 19,90</span>
                <span className="text-gray-500 dark:text-slate-400">/mês</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tudo do Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Open Finance integrado
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  IA para análises
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Suporte prioritário
                </li>
              </ul>
              <button
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-amber-500/25"
              >
                Assinar Premium
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.transacoesTotal}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Transações</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">{rendas.length}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Receitas</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-rose-400">{gastos.length}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Despesas</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.totalRecorrentes}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Recorrentes</p>
          </div>
        </Card>
      </div>

      {/* Storage Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
          Armazenamento de Dados
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
            <span className="text-gray-600 dark:text-slate-300">Local de armazenamento</span>
            <span className="text-gray-900 dark:text-white font-medium">Navegador (LocalStorage)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
            <span className="text-gray-600 dark:text-slate-300">Sincronização em nuvem</span>
            <span className="text-amber-400 font-medium">Não disponível</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
            Seus dados são armazenados localmente no seu navegador. Limpar os dados do navegador irá apagar suas informações financeiras.
          </p>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Gerenciamento de Dados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onExportCsv}
            className="flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar Dados (CSV)
          </button>

          <label className="flex items-center justify-center gap-2 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Importar Dados (CSV)
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-rose-500/20">
        <h3 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Zona de Perigo
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
          Ações irreversíveis. Tenha cuidado ao usar estas opções.
        </p>
        <button
          onClick={handleClearData}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Apagar Todos os Dados
        </button>
      </Card>

      {/* App Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Sobre o App
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2">
            <span className="text-gray-500 dark:text-slate-400">Versão</span>
            <span className="text-gray-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-gray-500 dark:text-slate-400">Desenvolvido com</span>
            <span className="text-gray-900 dark:text-white">Next.js + React</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-gray-500 dark:text-slate-400">Licença</span>
            <span className="text-gray-900 dark:text-white">MIT</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
