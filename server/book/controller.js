import path from "path"
import Book from './models.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname)


export const pdfControler = (req, res, next) => {
    const book_id = req.params.book_id;
    const file = path.join(`${__dirname}`, `../upload/book/${book_id}/${book_id}.pdf`);
    res.sendFile(file);
};


export const imgControler = async (req, res, next) => {
    const book_id = req.params.book_id;
    const book = await Book.get(book_id);
    const file = path.join(`${__dirname}`, `../upload/book` + book.poster)
    res.sendFile(file);
};
