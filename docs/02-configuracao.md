## 🎨 Personalização de cores

Edite as variáveis CSS em `src/styles.css`:

```css
:root {
  /* Cores primárias */
  --primary-color: #6366f1;        /* Cor principal (botões, links) */
  --primary-dark: #4f46e5;         /* Hover states */
  --secondary-color: #8b5cf6;      /* Cor secundária */
  
  /* Cores de texto */
  --text-color: #1f2937;           /* Texto principal */
  --text-light: #6b7280;           /* Texto secundário */
  
  /* Backgrounds */
  --background: #ffffff;           /* Fundo principal */
  --background-alt: #f9fafb;       /* Fundo alternativo */
  
  /* Sistema */
  --success: #10b981;              /* Mensagens de sucesso */
  --error: #ef4444;                /* Mensagens de erro */
}
```

## 📝 Personalização de conteúdo

### 1. Informações da empresa

Em `src/index.html`, edite:

```html
<!-- Meta tags -->
<title>Seu Título | Seu Slogan</title>
<meta name="description" content="Sua descrição para SEO">

<!-- Hero section -->
<h1>Seu título principal</h1>
<p>Sua proposta de valor</p>

<!-- Footer -->
<p>&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
```

### 2. Call-to-Action (CTA)

Personalize o botão principal e o texto do CTA:

```html
<button class="cta-button">Comece Agora - É Grátis!</button>
```

Dicas para CTAs de alta conversão:
- Use verbos de ação ("Comece", "Baixe", "Experimente")
- Adicione urgência ("Hoje", "Agora", "Limitado")
- Remova fricção ("Grátis", "Sem cartão", "Cancele quando quiser")

### 3. Benefícios/Features

Edite os cards de benefícios:

```html
<div class="benefit-card">
  <div class="benefit-icon">🚀</div>
  <h3>Rápido</h3>
  <p>Descrição do benefício</p>
</div>
```

## 🖼️ Substituição de imagens

1. Adicione suas imagens em `src/assets/`
2. Formatos recomendados: WebP (melhor performance) ou PNG/JPEG
3. Otimize antes: use TinyPNG ou Squoosh
4. Tamanhos recomendados:
   - Logo: 200x60px
   - Hero image: 1200x800px
   - Icons: 64x64px

Exemplo de uso:

```html
<img src="/assets/hero.webp" alt="Descrição" loading="lazy">
```

## 📧 Configuração do formulário

### Opção 1: Webhook simples

Em `src/script.js`, configure o endpoint:

```javascript
const WEBHOOK_URL = 'https://seu-webhook.com/submit';
```

### Opção 2: Serviços de terceiros

- **Formspree:** `action="https://formspree.io/f/seu-id"`
- **Netlify Forms:** Adicione `data-netlify="true"`
- **EmailJS:** Integração via JavaScript
- **Google Forms:** Embed do formulário

### Opção 3: Backend próprio

Configure uma API para receber os dados:

```javascript
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 🔍 SEO e meta tags

### Open Graph (redes sociais)

```html
<meta property="og:title" content="Seu Título">
<meta property="og:description" content="Sua descrição">
<meta property="og:image" content="https://seu-site.com/og-image.jpg">
<meta property="og:url" content="https://seu-site.com">
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Seu Título">
<meta name="twitter:description" content="Sua descrição">
<meta name="twitter:image" content="https://seu-site.com/twitter-image.jpg">
```

### Favicon

Adicione em `src/`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## 📊 Analytics (opcional)

### Google Analytics 4

Adicione antes do `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible / Fathom (privacy-friendly)

```html
<script defer data-domain="seu-site.com" src="https://plausible.io/js/script.js"></script>
```

## 🎯 Próximos passos

Continue para [Rodando](./03-rodando.md) para executar o projeto localmente.

