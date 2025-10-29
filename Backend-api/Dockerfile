# Etapa de construcción
FROM node:18-alpine AS build
WORKDIR /app

# Copiamos solo package.json y package-lock.json (optimiza cache)
COPY package*.json ./

# Instalamos dependencias
RUN npm ci --omit=dev

# Copiamos el resto del código
COPY . .

# Puerto de la app
EXPOSE 3000

# Comando por defecto
CMD ["node", "index.js"]
