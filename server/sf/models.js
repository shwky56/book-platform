import pool from "../app/db.js";
import { Model, validateEmail } from "../framework/index.js";

class Book extends Model {
    constructor () {
        super(pool);
    }
}

export default new Book();
