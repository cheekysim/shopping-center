import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';

// Interfaces

interface Directory {
    name: string;
    path: string;
    files: File[];
    directories: Directory[];
    size: number;
    created: number;
    createdDate: Date;
    accessed: number;
    accessedDate: Date;
    lastModified: number;
    lastModifiedDate: Date;
};

interface File {
    name: string;
    path: string;
    size: number;
    extension: string;
    type: string;
    lastModified: number;
    lastModifiedDate: Date;
    created: number;
    createdDate: Date;
    accessed: number;
}

// Express

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/shops-list', async (req, res) => {
    res.status(200).send('WIP');
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Functions

async function getDirectory(path: string): Promise<Directory> {
    // get details of path
    console.log(await fs.stat(path));
    const dir = await fs.readdir(path, { withFileTypes: true });
    return dir
}