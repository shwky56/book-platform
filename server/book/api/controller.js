import { Controller } from "../../framework/index.js";
import Book from "../models.js"
import path from "path"
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

import status from "../../framework/status.js";
import { Chapter, Search } from "../models.js";

const chapter = new Chapter();
const searchModel = new Search();


const onUpload = (req, res, id) => {
        // console.log(req.files);
        const files = req.files;
        Object.keys(files).forEach(key => {
            const exptend = files[key].name.split('.')[1];
            const filePath = path.join(__dirname, `../../upload/book/${id.toString()}`, id.toString()+ '.' + exptend);
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            
            files[key].mv(filePath, (error) => {
                console.log(error);
            })
        })

    }


class BookController extends Controller {
    constructor() {
        super(Book);
    }
    async storeAndUpload(req, res) {
        try {
            const data = JSON.parse(req.body.data);
            const objId = await this.Model.create(data);
            onUpload(req, res, objId);
            const poster_extend = req.files.poster.name.split('.')[1];
            const book = await Book.update(objId, {
                pdf_file: `/${objId.toString()}/${objId.toString()}.pdf`,
                poster: `/${objId.toString()}/${objId.toString()}.${poster_extend}`
            });
            res.status(201).json({ id: objId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }

    async updateAndUpload(req, res) {
        try {
            let data = null;
            if(req.body.data){
                data = JSON.parse(req.body?.data);
            }
            const book_id = req.params.id;
            const objId = req.params.id;
            if(req.files){
                onUpload(req, res, objId);
            }
            if(data){
                const book = await Book.update(objId, data);
            }
            res.status(201).json({ message: `${this.Model.constructor.name} updated` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }

    async bookChapter(req, res) {
        try {
            const chapters = await chapter.search("book_id", req.params.id);
            if (!chapters) {
                res.status(status.HTTP_404_NOT_FOUND).json({ error: `book not found` });
            } else {
                res.status(status.HTTP_200_OK).json(chapters);
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ error: "Server error" });
        }
    }
    
    async searchsave(req, res) {
        try {
            const searchQuery = await req.query;
            const keys = Object.keys(searchQuery)
            const search = await this.Model.search(keys[0], searchQuery[keys[0]]);
            if(!search[0]){
                res.status(status.HTTP_404_NOT_FOUND).json({ massage: `${keys[0]} = ${searchQuery[keys[0]]} not found`});
            }
            else{
                if(req.userId)
                    searchModel.create({ user_id: req.userId, title: `${searchQuery[keys[0]]}`})
                res.status(status.HTTP_200_OK).json(search)
            }
        } catch (err) {
            res.send(err.message)
        }
    }
    
    async filter(req, res){
        this.search(req, res)
    }
}
export default new BookController();
