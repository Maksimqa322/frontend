# Указываем базовый образ для Node.js
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем фронтенд-приложение
RUN npm run build

# --- Production stage ---
FROM nginx:1.23

# Копируем собранные файлы в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт для nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
