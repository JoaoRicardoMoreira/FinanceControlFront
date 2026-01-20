'use client';

import Card from '@/components/ui/Card';

export default function OpenFinancePlaceholder() {
    return (
        <Card className="p-8">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
                {/* Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                    <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-slate-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                        Coming Soon
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-slate-100 tracking-tight">
                    Open Finance
                </h3>

                {/* Description */}
                <p className="text-slate-400 max-w-md leading-relaxed">
                    Em breve você poderá conectar suas contas bancárias e cartões de crédito
                    automaticamente através do Open Finance, facilitando o controle das suas finanças.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
                    {[
                        {
                            icon: (
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
                            ),
                            title: 'Sincronização Automática',
                            description: 'Transações importadas automaticamente',
                        },
                        {
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ),
                            title: 'Segurança Garantida',
                            description: 'Conexão segura e criptografada',
                        },
                        {
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                            ),
                            title: 'Análises Avançadas',
                            description: 'Insights detalhados dos seus gastos',
                        },
                        {
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ),
                            title: 'Múltiplas Contas',
                            description: 'Gerencie todas suas contas em um só lugar',
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400 flex-shrink-0 shadow-[0_0_10px_-2px_rgba(59,130,246,0.3)]">
                                {feature.icon}
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-semibold text-slate-200 mb-1">
                                    {feature.title}
                                </h4>
                                <p className="text-xs text-slate-500">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <p className="text-xs text-slate-600 mt-8">
                    Fique atento às próximas atualizações para ter acesso a essa funcionalidade
                </p>
            </div>
        </Card>
    );
}
