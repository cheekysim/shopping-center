import express from 'express';
import path from 'path';
import fs from 'fs/promises';

// Express

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/api/stores', async (req, res) => {
    const shops = JSON.parse((await fs.readFile('shops.json')).toString());
    res.send(shops);
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
