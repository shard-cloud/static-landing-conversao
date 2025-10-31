# Landing Page de Conversão

Landing page moderna, responsiva e otimizada para conversão. Design acessível (WCAG 2.1), formulário de captura de leads e CTA destacado.

## 🎯 Características

- ✅ Design responsivo (mobile-first)
- ✅ Acessibilidade (ARIA, WCAG 2.1)
- ✅ Performance otimizada (Lighthouse ≥ 90)
- ✅ Formulário de captura de leads
- ✅ CTA destacado e persuasivo
- ✅ Animações suaves (CSS)
- ✅ SEO básico configurado
- ✅ Internacionalização (i18n) - EN, PT-BR, ES
- ✅ Seletor de idioma automático

## 📋 Requisitos

- Node.js 18+ (para dev server local)
- Navegador moderno

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:80
```

## 📦 Scripts úteis

- `npm run dev` – Servidor de desenvolvimento (porta 80)
- `npm run build` – Gera build otimizado (pasta dist/)
- `npm run preview` – Preview do build

## 📂 Estrutura

```
src/
  ├── index.html       # Página principal
  ├── styles.css       # Estilos globais
  ├── script.js        # Lógica do formulário
  ├── i18n.js          # Sistema de internacionalização
  ├── locales/         # Arquivos de tradução
  │   ├── en.json      # Inglês
  │   ├── pt-BR.json   # Português (Brasil)
  │   └── es.json      # Espanhol
  └── health.html      # Health check
docs/                  # Documentação detalhada
.shardcloud.example    # Configuração para Shard Cloud
```

## 🎨 Personalização

Edite as variáveis CSS em `src/styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --text-color: #1f2937;
  --background: #ffffff;
}
```

## 🚀 Deploy na Shard Cloud

```bash
# 1. Configurar projeto
cp .shardcloud.example .shardcloud
# Edite .shardcloud com suas configurações

# 2. Build do projeto
npm run build

# 3. Deploy
# Zip o projeto e faça upload no dashboard da Shard Cloud
# Ou conecte seu repositório Git para deploy automático
```

Consulte a [documentação completa de deploy](./docs/04-deploy.md) para mais detalhes.

## 🐳 Docker

```bash
docker build -t landing-conversao .
docker run -p 80:80 landing-conversao
```

## 📊 Performance

Esta landing page foi otimizada para obter scores altos no Lighthouse:
- Performance: ≥ 90
- Acessibilidade: ≥ 95
- Boas Práticas: ≥ 90
- SEO: ≥ 90

## 📄 Licença

MIT

