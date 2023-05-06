import { Request } from './models.js';
import { status } from '../framework/index.js';
import { verifyToken } from '../framework/permissions.js';
const requests = new Request();


export const isRedaerViewBook = async (req, res, next) => {
    try{
        if(!verifyToken(req, res)){
            return ;
        }
        console.log(req.userId);
        const book_id = req.params.book_id;
        const request = await requests.find({ user_id: req.userId, book_id: parseInt(book_id)});
        if(!request[0] || request[0].status !== "accept"){
            return res.status(status.HTTP_403_FORBIDDEN).json({ message: "Access to the requested book is forbidden"});
        }
        else{
            next();
        }
    }catch(error){
        res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const canViewBook = async (req, res, next) => {
    if(!verifyToken(req, res)){
        return ;
    }
    if(req.type === 'admin'){
        next();
    }
    else{
        return await isRedaerViewBook(req, res, next);
    }
}

