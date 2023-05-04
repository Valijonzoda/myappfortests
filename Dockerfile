FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависмости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Сбирааем приложение
RUN npm run build
#запуск
CMD ["npm", "run", "start"]
