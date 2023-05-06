import pool from "../app/db.js";
import { Model } from "../framework/index.js";

class Request extends Model {
    constructor () {
        super(pool);
    }
}

export default new Request();
