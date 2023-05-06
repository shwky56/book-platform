import pool from "../app/db.js";

import { Model } from "../framework/index.js";

class User extends Model {
    constructor () {
        super(pool);
    }

}


export default new User();
