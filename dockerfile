# ESTÁGIO 1: Build da Aplicação Vue.js
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência primeiro (para cache do Docker)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código-fonte
COPY . .

# Executa o script de build (cria a pasta /app/dist)
RUN npm run build

# ESTÁGIO 2: Servidor de Produção (usando Node + Vite Preview)
FROM node:20-alpine AS final

WORKDIR /app

# Copia apenas as dependências de produção (necessárias para o 'vite preview')
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copia a pasta 'dist' construída do estágio anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta padrão do Vite Preview (4173)
EXPOSE 4173

# Comando para iniciar o servidor de preview do Vite
# O '--host 0.0.0.0' é essencial para permitir acesso de fora do container
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]