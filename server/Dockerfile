# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

RUN npm install -g concurrently

# Копируем остальные файлы проекта
COPY . .

# Открываем порт 4040
EXPOSE 4040

# Запускаем приложение
CMD ["npm", "run", "start"]
