import pool from "../app/db.js";
import { Model } from "../framework/index.js";

export class Chapter extends Model {
    constructor () {
        super(pool);
    }
}

export class Search extends Model{
    constructor () {
        super(pool);
    }
}

class Book extends Model {
    constructor () {
        super(pool);
    }
}

export class Request extends Model {
    constructor () {
        super(pool);
    }
}

export default new Book();
