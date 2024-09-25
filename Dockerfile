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