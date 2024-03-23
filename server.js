const http = require('http');
const fs = require('fs');
const url = require('url');

// Путь к файлу с базой данных пользователей
const usersFilePath = 'users.json';

// Читаем существующих пользователей из файла JSON
let users = [];
try {
    users = JSON.parse(fs.readFileSync(usersFilePath));
} catch (error) {
    console.error('Error reading users file:', error);
}

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/register' && req.method === 'POST') {
        // Получаем данные из запроса
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            // Проверяем, не зарегистрирован ли уже пользователь с таким же именем
            const userExists = users.some(user => user.username === username);
            if (!userExists) {
                // Добавляем нового пользователя в список
                users.push({ username, password });
                fs.writeFileSync(usersFilePath, JSON.stringify(users));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
            } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Username already exists' }));
            }
        });
    } else if (pathname === '/login' && req.method === 'POST') {
        // Получаем данные из запроса
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            // Проверяем, существует ли пользователь с таким логином и паролем
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
            } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Invalid username or password' }));
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

// Слушаем порт 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
