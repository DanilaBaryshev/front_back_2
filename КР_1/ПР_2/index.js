const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSOM
app.use(express.json());

// Cтруктура объекта товара: id name price
// массив тестовыми товарами
let products = [
    { id: 1, name: 'Вентелятор',    price: 5000 },
    { id: 2, name: 'Телефон',       price: 35000 },
    { id: 3, name: 'Наушники',      price: 8000  },
];

// просмотр всех товаров
app.get('/products', (req, res) => {
    res.json(products);
});

// просмотр товара по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
});

// добавление товара
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Укажите name и price' });
    const newProduct = {
        id: Date.now(),
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// редактирование товара по id
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    const { name, price } = req.body;
    if (name !== undefined)  product.name  = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

// удаление товара по id
app.delete('/products/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter(p => p.id != req.params.id);
    if (products.length === initialLength) return res.status(404).json({ error: 'Товар не найден' });
    res.send('Ok');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
