import pdfjsLib from 'pdfjs-dist';
import fs from 'fs';
import express from 'express';
import path from "path"
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express.Router()
app.get('/:book_id', (req, res) => {
    const book_id = req.params.book_id;
    console.log(book_id);
    const file = path.join(`${__dirname}`, `../upload/book/32/32.pdf`);
    res.sendFile(file);
});

export default app;