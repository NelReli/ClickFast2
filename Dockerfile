# 1. On part d'une image de base
FROM nginx:alpine

# 2. On copie nos fichiers dans le conteneur
COPY src/ /usr/share/nginx/html/

# 3. On expose le port sur lequel Nginx écoute
EXPOSE 80