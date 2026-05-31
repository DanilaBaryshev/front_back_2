// [Требование 2] Подключение зависимостей
const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
const port = 3000;

// [Требование 5] Массив товаров (≥10): поля id, name, category, description, price, stock
let products = [
    { id: nanoid(6), name: 'MacBook Air M2',          category: 'Ноутбуки',   description: 'Лёгкий ноутбук Apple на чипе M2, 8 ГБ ОЗУ, 256 ГБ SSD',                     price: 119990, stock: 5  },
    { id: nanoid(6), name: 'ASUS ZenBook 14',          category: 'Ноутбуки',   description: 'Ультрабук с OLED-дисплеем 14", Intel Core i5, 16 ГБ ОЗУ',                  price: 74990,  stock: 8  },
    { id: nanoid(6), name: 'Samsung Galaxy S24',       category: 'Смартфоны',  description: 'Флагман с Snapdragon 8 Gen 3, камерой 200 МП, 256 ГБ',                      price: 89990,  stock: 12 },
    { id: nanoid(6), name: 'iPhone 15',                category: 'Смартфоны',  description: 'Смартфон Apple с чипом A16, основной камерой 48 МП',                        price: 94990,  stock: 7  },
    { id: nanoid(6), name: 'Xiaomi Redmi Note 13',     category: 'Смартфоны',  description: 'Доступный смартфон с AMOLED 6.67", Snapdragon 685, 128 ГБ',                 price: 19990,  stock: 20 },
    { id: nanoid(6), name: 'Sony WH-1000XM5',          category: 'Наушники',   description: 'Беспроводные наушники с лучшим ANC в классе, до 30 ч автономии',            price: 29990,  stock: 15 },
    { id: nanoid(6), name: 'Apple AirPods Pro 2',      category: 'Наушники',   description: 'TWS-вкладыши с ANC и Adaptive Transparency',                                price: 24990,  stock: 10 },
    { id: nanoid(6), name: 'Samsung Odyssey G5 27"',   category: 'Мониторы',   description: 'Изогнутый игровой монитор WQHD (2560×1440), 165 Гц, VA-панель',            price: 34990,  stock: 4  },
    { id: nanoid(6), name: 'LG UltraFine 24" 4K',     category: 'Мониторы',   description: 'IPS-монитор 4K с USB-C 96 Вт, высокая точность цветопередачи',             price: 42990,  stock: 6  },
    { id: nanoid(6), name: 'Logitech MX Keys',         category: 'Клавиатуры', description: 'Беспроводная клавиатура с умной подсветкой для нескольких устройств',       price: 12990,  stock: 18 },
    { id: nanoid(6), name: 'Logitech MX Master 3S',    category: 'Мыши',       description: 'Эргономичная мышь: сенсор 8000 DPI, бесшумные кнопки, MagSpeed-колесо',    price: 9990,   stock: 25 },
];

// [Требование 3] Middleware для парсинга JSON
app.use(express.json());

// [Требование 14] CORS — разрешаем запросы от React-клиента на порту 3001
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// [Требование 4] Middleware для логирования запросов
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

// [Требование 6] Функция-помощник для получения товара из списка (или 404)
function findProductOr404(id, res) {
    const product = products.find(p => p.id === id);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return null;
    }
    return product;
}

// [Требование 7] POST /api/products — создание нового товара
app.post('/api/products', (req, res) => {
    const { name, category, description, price, stock } = req.body;
    if (!name || !category || !description || price === undefined || stock === undefined) {
        return res.status(400).json({ error: 'Укажите name, category, description, price и stock' });
    }
    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// [Требование 8] GET /api/products — получение всех товаров
app.get('/api/products', (req, res) => {
    res.json(products);
});

// [Требование 9] GET /api/products/:id — получение товара по id
app.get('/api/products/:id', (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;
    res.json(product);
});

// [Требование 10] PATCH /api/products/:id — частичное обновление товара
app.patch('/api/products/:id', (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;

    const { name, category, description, price, stock } = req.body;
    if (
        name === undefined &&
        category === undefined &&
        description === undefined &&
        price === undefined &&
        stock === undefined
    ) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    if (name !== undefined)        product.name        = name.trim();
    if (category !== undefined)    product.category    = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined)       product.price       = Number(price);
    if (stock !== undefined)       product.stock       = Number(stock);

    res.json(product);
});

// [Требование 11] DELETE /api/products/:id — удаление товара
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const exists = products.some(p => p.id === id);
    if (!exists) return res.status(404).json({ error: 'Product not found' });
    products = products.filter(p => p.id !== id);
    // Правильнее 204 без тела
    res.status(204).send();
});

// [Требование 12] 404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// [Требование 13] Глобальный обработчик ошибок (чтобы сервер не падал)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// [Требование 15] Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
