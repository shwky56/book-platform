


import { Controller, status } from "../../framework/index.js";
import { IsValidateEmail, IsValidatePassword } from "../../framework/index.js";
import bcrypt from 'bcryptjs'
import  User  from "../models.js";



class UserController extends Controller {
    constructor() {
        super(User);
    }
    
    async store(req, res) {
        try {
            const data = req.body;
            
            const objId = await this.Model.create({
                ...data,
                password: await bcrypt.hash(data.password, 12)
            });
            
            res.status(201).json({ id: objId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }
}
export default new UserController();