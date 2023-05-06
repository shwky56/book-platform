import express from 'express';
import path from "path"
import Book from './models.js';
import { pdfControler, imgControler } from './controller.js';
import { isRedaerViewBook, canViewBook } from './permissions.js';
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express.Router()


app.get('/pdf/:book_id', canViewBook, pdfControler);

app.get('/img/:book_id', imgControler);

export default app;