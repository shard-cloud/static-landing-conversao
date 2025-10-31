## 🚀 Desenvolvimento local

### 1. Instalação

```bash
# Clone ou copie o template
cd static-landing-conversao

# Instale as dependências
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor iniciará em **http://localhost:80**

#### Recursos do dev server:
- 🔥 Hot Module Replacement (HMR)
- ⚡ Atualizações instantâneas
- 🔍 Source maps para debug
- 📱 Acesso via rede local (teste em mobile)

### 3. Testar em outros dispositivos

O Vite exibe o IP da rede local. Acesse do seu celular:

```
Network: http://192.168.1.X:80
```

## 🏗️ Build para produção

### 1. Gerar build otimizado

```bash
npm run build
```

Isso criará a pasta `dist/` com:
- ✅ HTML minificado
- ✅ CSS otimizado e prefixado
- ✅ JavaScript minificado
- ✅ Assets otimizados

### 2. Preview do build

```bash
npm run preview
```

Testa o build localmente antes do deploy.

## 🐳 Docker

### Build da imagem

```bash
docker build -t landing-conversao .
```

### Executar container

```bash
docker run -p 80:80 landing-conversao
```

Acesse: http://localhost

### Docker Compose (opcional)

Crie `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

Execute:

```bash
docker-compose up -d
```

## 🧪 Testes

### Lighthouse audit

1. Abra Chrome DevTools (F12)
2. Vá para aba "Lighthouse"
3. Selecione categorias: Performance, Accessibility, Best Practices, SEO
4. Clique em "Generate report"

**Meta:** Todos os scores ≥ 90

### Teste de acessibilidade

Ferramentas recomendadas:
- **axe DevTools:** Extensão do Chrome
- **WAVE:** https://wave.webaim.org
- **Navegação por teclado:** Tab, Enter, Esc

### Teste responsivo

Chrome DevTools > Device Toolbar (Ctrl+Shift+M)

Dispositivos para testar:
- 📱 Mobile: 375px (iPhone SE)
- 📱 Mobile L: 425px
- 📱 Tablet: 768px
- 💻 Desktop: 1440px
- 🖥️ Desktop XL: 1920px

## 🔍 Debug

### Verificar erros no console

Abra DevTools (F12) > Console

Não deve haver erros em produção.

### Network tab

Verifique:
- ✅ Todos os recursos carregando (200 OK)
- ✅ Tamanho total < 500KB
- ✅ Tempo de carregamento < 2s

### Performance profiling

DevTools > Performance > Record

Analise:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms

## 📊 Validação HTML/CSS

### HTML Validator

https://validator.w3.org/

Cole a URL ou o código HTML.

### CSS Validator

https://jigsaw.w3.org/css-validator/

Valide o CSS para garantir compatibilidade.

## 🎯 Checklist pré-deploy

- [ ] Build gerado sem erros
- [ ] Lighthouse scores ≥ 90
- [ ] Formulário funcionando
- [ ] Links testados
- [ ] Imagens carregando
- [ ] Responsivo em todos dispositivos
- [ ] Acessibilidade validada
- [ ] Meta tags configuradas
- [ ] Analytics configurado (se aplicável)
- [ ] Favicon presente

## 🚀 Próximos passos

Continue para [Deploy](./04-deploy.md) para colocar em produção.

