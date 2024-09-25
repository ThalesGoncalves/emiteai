<<<<<<< HEAD
# Etapa 1: Construção da aplicação
FROM node:20 AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:stable-alpine

# Copiar os arquivos build para o NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]
=======
# Usar uma imagem base do Java
FROM openjdk:17-jdk-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo JAR gerado para a imagem
COPY target/Pessoas-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta que o aplicativo estará escutando
EXPOSE 8080

# Comando para executar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
>>>>>>> fa7523b112ec785901bf63ea192a5a993743d18c
