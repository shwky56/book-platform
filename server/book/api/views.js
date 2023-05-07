import Book from '../models.js';
import { APIView } from '../../framework/index.js';
import BookController from "./controller.js"
import fileUpload from "express-fileupload"

class BookAPIView extends APIView {
    constructor(){
        super(Book, BookController)
    }
    setupRoutes(){
        this.router.get('/:id/chapter', this.Controller.bookChapter.bind(this.Controller));
        this.router.get('/filter', this.Controller.filter.bind(this.Controller));
        this.router.get('/search', this.Controller.searchsave.bind(this.Controller));
        this.router.post('/', fileUpload({ createParentPath: true }), this.Controller.storeAndUpload.bind(this.Controller));
        this.router.put('/:id', fileUpload({ createParentPath: true }), this.Controller.updateAndUpload.bind(this.Controller));
        return super.setupRoutes()
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new BookAPIView();