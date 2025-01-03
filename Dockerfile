# Usar una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

ENV AUTH_SERVICE_URL=http://host.docker.internal:4000/query
ENV IMAGE_SERVICE_URL=http://host.docker.internal:4001/query
ENV CATALOG_SERVICE_URL=http://host.docker.internal:4002/query
ENV CART_SERVICE_URL=http://host.docker.internal:4003/query
ENV ORDER_SERVICE_URL=http://host.docker.internal:4004/query

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 4080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
