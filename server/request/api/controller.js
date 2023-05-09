import { Controller, status } from "../../framework/index.js";
import  Request  from "../models.js";



class RequestController extends Controller {
    constructor() {
        super(Request);
    }
    
    async filter(req, res){
        try {
            const searchQuery = await req.query;
            const keys = Object.keys(searchQuery)
            
            if(searchQuery["user_id"])
                searchQuery["user_id"] = parseInt(searchQuery["user_id"])
            if(searchQuery['book_id'])
                searchQuery['book_id'] = parseInt(searchQuery['book_id'])
            const search = await this.Model.find(searchQuery);
            if(!search[0]){
                res.status(status.HTTP_404_NOT_FOUND).json({ massage: `request not found`});
            }
            else{
                res.status(status.HTTP_200_OK).json(search[0])
            }
        } catch (err) {
            res.send(err.message)
        }
    }
}
export default new RequestController();
