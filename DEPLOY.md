# 🚀 Deploy do FlowClaude na Vercel

## Opção 1: Deploy via GitHub (Recomendado - Mais Fácil)

### Passo a Passo:

1. **Acesse Vercel**
   - Vá para: https://vercel.com
   - Clique em "Sign Up" ou "Log In"
   - Conecte com sua conta GitHub

2. **Import Project**
   - Clique em "Add New..." → "Project"
   - Selecione "Import Git Repository"
   - Procure por `georgemarmelstein/superprendizagemR`
   - Clique em "Import"

3. **Configure o Projeto**
   - Framework Preset: **Next.js** (já detecta automaticamente)
   - Root Directory: `.` (deixe como está)
   - Build Command: `npm run build` (já preenchido)
   - Output Directory: `.next` (já preenchido)
   - Install Command: `npm install` (já preenchido)

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - Seu link estará pronto! 🎉

### Você receberá 3 URLs:
- **Production**: `https://flowclaude.vercel.app` (ou similar)
- **Preview**: URLs para cada branch
- **Local**: http://localhost:3000 (desenvolvimento)

---

## Opção 2: Deploy via CLI (Mais Rápido)

Se preferir fazer direto pelo terminal:

```bash
# 1. Login na Vercel
vercel login

# 2. Deploy (primeira vez)
vercel

# 3. Deploy para produção
vercel --prod
```

Siga as instruções interativas:
- Set up and deploy? **Y**
- Which scope? (selecione sua conta)
- Link to existing project? **N**
- What's your project's name? **flowclaude**
- In which directory is your code located? **./**
- Want to override settings? **N**

---

## 🎯 Após o Deploy

Você terá um link como:
- `https://flowclaude-xxx.vercel.app`
- `https://seu-dominio.vercel.app`

### Compartilhe o link beta:
✅ Funciona em qualquer dispositivo
✅ HTTPS automático
✅ Deploy automático a cada push
✅ Preview de branches
✅ Grátis para projetos pessoais

---

## ⚙️ Configurações Extras (Opcional)

### Domínio Customizado
1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure DNS

### Variáveis de Ambiente
1. Settings → Environment Variables
2. Adicione: `NEXT_PUBLIC_CLAUDE_API_KEY`
3. Redeploy

### Analytics
1. Analytics tab
2. Enable Vercel Analytics

---

## 🔄 Atualizações Automáticas

Toda vez que você fizer push para o GitHub:
```bash
git add .
git commit -m "feat: nova feature"
git push
```

A Vercel automaticamente:
1. Detecta o push
2. Faz build
3. Deploy
4. URL atualizada em ~2min

---

## 📱 Preview Links

Cada branch recebe um URL único:
- `main`: https://flowclaude.vercel.app
- `dev`: https://flowclaude-git-dev.vercel.app
- `feature`: https://flowclaude-git-feature.vercel.app

Perfeito para testar antes de fazer merge!

---

## ⚡ Status do Deploy

Vercel mostra em tempo real:
- ✅ Build succeeded
- ⏱️ Build time
- 📊 Bundle size
- 🌍 Deploy regions

---

## 🆘 Problemas?

### Build falhou?
```bash
# Teste localmente primeiro
npm run build

# Se funcionar local, problema é na Vercel
# Verifique logs em: vercel.com/seu-projeto
```

### 404 após deploy?
- Verifique se `app/` existe
- Confirme estrutura Next.js 14 (App Router)

### Lento?
- Vercel usa Edge Network global
- Primeiro acesso pode ser lento (cold start)
- Depois fica instantâneo

---

## 🎉 Pronto!

Seu FlowClaude estará online e acessível para qualquer pessoa com o link!
