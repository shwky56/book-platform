import pool from "../app/db.js";
import { Model } from "../framework/index.js";

class Search extends Model {
    constructor () {
        super(pool);
    }
}

export default new Search();
