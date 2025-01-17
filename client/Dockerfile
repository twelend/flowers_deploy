# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Строим проект
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
