## 🚀 Deploy na Shard Cloud

A Shard Cloud oferece hospedagem moderna e confiável para seus projetos. Siga este guia para fazer deploy da sua landing page em minutos.

### 📋 Pré-requisitos

- Conta na [Shard Cloud](https://shardcloud.app)
- Projeto buildado e funcionando localmente
- Arquivo `.shardcloud` configurado

## 🔧 Configuração do projeto

### 1. Criar arquivo `.shardcloud`

Crie um arquivo `.shardcloud` na raiz do projeto:

```bash
DISPLAY_NAME=Landing Page Conversão
MAIN=index.html
MEMORY=512
VERSION=recommended
SUBDOMAIN=sua-landing
CUSTOM_COMMAND=npm run build && npm run preview
DESCRIPTION=Landing page moderna e otimizada para conversão com i18n
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` baseado no `env.example`:

```env
# Page configuration
VITE_APP_TITLE=Sua Landing Page
VITE_APP_DESCRIPTION=Landing page para conversão
VITE_APP_VERSION=1.0.0

# Language (en, pt-BR, es)
SITE_LANGUAGE=pt-BR

# Contact form
VITE_CONTACT_EMAIL=contato@suaempresa.com
VITE_CONTACT_PHONE=+55 (11) 99999-9999
```

## 📦 Preparação para deploy

### 1. Build do projeto

```bash
# Instalar dependências
npm install

# Gerar build de produção
npm run build
```

### 2. Testar build localmente

```bash
# Preview da build
npm run preview
```

Acesse `http://localhost:80` para verificar se tudo está funcionando.

## 🚀 Deploy na Shard Cloud

### Método 1: Upload direto (Recomendado)

1. **Acesse o Dashboard**

   - Vá para [Shard Cloud Dashboard](https://shardcloud.app/dash)
   - Faça login na sua conta

2. **Criar nova aplicação**

   - Clique em **"New app"**
   - Selecione **"Upload"**

3. **Preparar arquivos**

   - Zip toda a pasta do projeto (incluindo `.shardcloud`)
   - Ou zip apenas a pasta `dist/` + `.shardcloud`

4. **Upload e deploy**
   - Arraste o arquivo ZIP ou clique para selecionar
   - Aguarde o processamento (alguns segundos)
   - Sua aplicação estará disponível em `https://sua-landing.shardweb.app`

### Método 2: Deploy via Git

1. **Conectar repositório**

   - No dashboard, clique em **"New app"**
   - Selecione **"Git Repository"**
   - Conecte seu repositório GitHub/GitLab

2. **Configurar build**

   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Node version:** `20` (recomendado)

3. **Deploy automático**
   - Cada push na branch principal fará deploy automático
   - Configure webhooks se necessário

## 🌐 Configurações avançadas

### Subdomínio personalizado

No arquivo `.shardcloud`:

```bash
SUBDOMAIN=minha-landing
```

Sua aplicação ficará disponível em: `https://minha-landing.shardweb.app`

### Domínio personalizado

1. **Configurar DNS**

   - Adicione um registro CNAME apontando para `sua-landing.shardweb.app`
   - Ou configure A record com o IP fornecido

2. **Ativar no dashboard**
   - Vá para configurações da aplicação
   - Adicione seu domínio personalizado
   - Configure certificado SSL (automático)

### Variáveis de ambiente

Configure variáveis sensíveis no dashboard:

1. Acesse configurações da aplicação
2. Vá para **"Environment Variables"**
3. Adicione suas variáveis:
   ```
   VITE_CONTACT_EMAIL=contato@suaempresa.com
   VITE_CONTACT_PHONE=+55 (11) 99999-9999
   ```

## 🔍 Monitoramento e logs

### Logs da aplicação

- Acesse o dashboard da aplicação
- Vá para a aba **"Logs"**
- Monitore erros e performance em tempo real

### Métricas

- **Uptime:** Monitoramento automático
- **Performance:** Métricas de resposta
- **Tráfego:** Estatísticas de acesso

## 🔒 Segurança

### HTTPS automático

- Todos os deploys na Shard Cloud incluem HTTPS automático
- Certificados SSL gerenciados automaticamente
- Renovação automática

### Headers de segurança

Configure no `nginx.conf` (já incluído):

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 🚦 CI/CD com GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Shard Cloud

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Shard Cloud
        run: |
          # Zip project
          zip -r deploy.zip dist/ .shardcloud

          # Upload to Shard Cloud (configure API token)
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.SHARD_TOKEN }}" \
            -F "file=@deploy.zip" \
            https://api.shardcloud.app/deploy
```

## 🐛 Troubleshooting

### Build falha

```bash
# Limpar cache
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Aplicação não inicia

1. Verifique logs no dashboard
2. Confirme se `ENTRYPOINT` está correto
3. Teste localmente com `npm run preview`

### Erro 404

- Confirme se `index.html` está na pasta `dist/`
- Verifique configuração do `nginx.conf`

### Problemas de i18n

- Confirme se arquivos `locales/*.json` estão incluídos
- Teste troca de idioma localmente primeiro

## ✅ Checklist de deploy

- [ ] Arquivo `.shardcloud` configurado
- [ ] Build gerado sem erros (`npm run build`)
- [ ] Testado localmente (`npm run preview`)
- [ ] Variáveis de ambiente configuradas
- [ ] Projeto zipado ou conectado ao Git
- [ ] Deploy realizado no dashboard
- [ ] Aplicação acessível via URL
- [ ] Formulário funcionando em produção
- [ ] Troca de idioma funcionando
- [ ] HTTPS ativo
- [ ] Logs monitorados

## 🎉 Sucesso!

Sua landing page está no ar na Shard Cloud!

### Próximos passos:

1. **Teste completo:** Verifique todas as funcionalidades
2. **Analytics:** Configure Google Analytics se necessário
3. **SEO:** Submeta ao Google Search Console
4. **Monitoramento:** Configure alertas de uptime
5. **Otimização:** Monitore métricas e otimize continuamente

### URLs importantes:

- **Dashboard:** https://shardcloud.app/dash
- **Documentação:** https://docs.shardcloud.app/quickstart
- **Suporte:** https://shardcloud.app/support

---

**Precisa de ajuda?** Consulte a [documentação oficial da Shard Cloud](https://docs.shardcloud.app/quickstart) ou entre em contato com o suporte.
