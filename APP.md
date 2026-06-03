# App local — Controle Financeiro

Mesma interface do projeto Next.js, empacotada como **site estático** que roda no navegador (sem servidor Node em produção). Os dados ficam no `localStorage` do dispositivo.

## Subir o app em 1 comando

```bash
npm install
npm run app
```

Abre em **http://localhost:3000**. Para parar: `Ctrl+C`.

No Windows, dê duplo clique em `scripts/run-app.cmd`.

## Só gerar os arquivos (pasta `out/`)

```bash
npm run build:app
```

Sirva a pasta `out/` com qualquer servidor estático (`npx serve out`, nginx, GitHub Pages, etc.).

## Instalar como app (PWA)

1. Rode `npm run app` ou hospede a pasta `out/`.
2. No Chrome/Edge: menu → **Instalar aplicativo** / **Instalar Controle Financeiro**.

## Importar dados JSON

### 1. Arquivo
Cabeçalho → botão **JSON** → escolha o `.json` exportado antes.

### 2. Colar texto
Cabeçalho → **Colar JSON** → cole o conteúdo → **Continuar** → Mesclar ou Substituir.

### 3. Tela inicial
Se não houver dados, aparece um cartão de boas-vindas com as mesmas opções.

### 4. Link com backup embutido (opcional)
Útil para atalhos; arquivos grandes podem estourar o limite da URL.

Gere o link no console do navegador (com o JSON já exportado):

```js
const json = '...cole o backup aqui...';
const url = location.origin + '/?data=' + btoa(unescape(encodeURIComponent(json)));
console.log(url);
```

Abra o link; o app importa e remove o parâmetro da barra de endereço.

## Formato do JSON

```json
{
  "version": 2,
  "exportedAt": "2026-06-01T12:00:00.000Z",
  "rendas": [{ "id": "...", "desc": "Salário", "valor": 5000, "data": "2026-06-01" }],
  "gastos": [],
  "recorrentes": [],
  "metas": { "Alimentação": 800 },
  "investimentos": [],
  "investimentoConfig": { "taxaMensalPercent": 0.8 },
  "filters": { "month": 6, "year": 2026 }
}
```

Versão `1` também é aceita (sem investimentos).

## Exportar backup

Cabeçalho → **Backup JSON** — use esse arquivo para migrar ou fazer cópia de segurança.

## Desenvolvimento (com hot reload)

```bash
npm run dev
```

Para build de app estático, use `npm run build:app` (não use `next start`, que exige servidor Node).
