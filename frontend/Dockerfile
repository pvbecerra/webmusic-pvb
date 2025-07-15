# Dockerfile
# Usamos una imagen base de Node.js LTS (v20 es la más reciente LTS)
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de manifiesto de dependencias primero para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de tu aplicación
COPY . .

# Expón el puerto que Vite usa para el desarrollo
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
