import { status } from "../framework/index.js";


export const ifMyRequest = (req, res, next) => {
    if(req.type === "admin"){
        next();
    }
    else if( req.userId === req.body.user_id && (req.mthod === "POST" || "GET")){
        next();
    }
    else{
        res.status(status.HTTP_403_FORBIDDEN).json({ message: "can not create requst for anzer user"});
    }
} 