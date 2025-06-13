FROM node:18
WORKDIR /usr/src/app

# Copiar primeiro o package.json e instalar as dependências
COPY package*.json ./
RUN npm install

# Depois copiar o restante dos arquivos da aplicação
COPY . .

CMD ["node", "index.js"]
