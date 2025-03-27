/*

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors({
    origin:  'http://127.0.0.1:5500' ,
    credentials: true,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'OPTIONS']
}));
//app.use(cors({ origin: 'http://127.0.0.1:5500' }));
//'http://localhost:5500' *

// Настройки сессии
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Маршрут для регистрации
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        // Сохраняем пользователя в сессии
        req.session.user = { email };
        res.status(200).send('Signup successful');
    } else {
        res.status(400).send('Invalid input');
    }
});

// Проверка авторизации и отправка страницы с рецептами
app.get('/own_recipe.html', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    res.sendFile(__dirname + '/own_recipe.html');
});

// Упрощаем маршрут отправки рецепта
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/submit-recipe', upload.single('image'), (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('You must be logged in to submit a recipe');
    }
    res.send('Recipe submitted successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

*/

// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// app.use(cors({
//     origin: 'http://127.0.0.1:5500',
//     credentials: true,
//     allowedHeaders: ['Content-Type'],
//     methods: ['GET', 'POST', 'OPTIONS']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Allow requests from these origins
    credentials: true,  // Allow credentials (cookies, sessions)
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
    methods: ['GET', 'POST', 'OPTIONS'] // Allow GET, POST, OPTIONS methods
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: In production, set secure to true when using HTTPS
}));

// Маршрут для регистрации
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        // Save the user in session
        req.session.user = { email };
        console.log(`User signed up: ${email}`);
        res.status(200).send('Signup successful');
    } else {
        res.status(400).send('Invalid input');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    if (req.session.user) {
        console.log(`User logged out: ${req.session.user.email}`);
    }
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.status(200).send('Logout successful');
    });
});

// Protected route to get recipes
app.get('/own_recipe.html', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    res.sendFile(__dirname + '/own_recipe.html');
});

// Route to submit a recipe
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/submit-recipe', upload.single('image'), (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('You must be logged in to submit a recipe');
    }

    console.log(`Recipe submitted by: ${req.session.user.email}`);
    console.log(`Recipe title: ${req.body.title || 'No title provided'}`);
    if (req.file) {
        console.log(`Image uploaded: ${req.file.filename}`);
    }
    
    res.send('Recipe submitted successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
