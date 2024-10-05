# Imagen base
FROM node:22-alpine

# Directorio de trabajo del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Puerto
EXPOSE 5000

# Comando para ejecutar el servidor
CMD ["node", "server.js"]
