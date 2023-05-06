import pool from "../app/db.js";
import bcrypt from 'bcrypt';

import { Model } from "../framework/index.js";


class User extends Model {
    constructor () {
        super(pool);
    }
}

export default new User();
