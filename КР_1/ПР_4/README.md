## Структура

```
backend/   - Express-сервер   (порт 3000)
frontend/  - React-приложение (порт 3001)
```

## Запуск

### Бэкенд

```
cd backend
npm install
node index.js
```

### Фронтенд

```
cd frontend
npm install
npm start
```

Открыть в браузере: http://localhost:3001

## API

GET    /api/products      Список товаров
GET    /api/products/:id  Товар по ID   
POST   /api/products      Создать товар  
PATCH  /api/products/:id  Обновить товар   
DELETE /api/products/:id  Удалить товар  

## Атрибуты товара

id          - string - nanoid(6), авто
name        - string - Название      
category    - string - Категория      
description - string - Описание          
price       - number - Цена
stock       - number - Количество на складе 
