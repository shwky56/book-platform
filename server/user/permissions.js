

import { status } from "../framework/index.js";


export const ifMyPut = (req, res, next) => {
    if(req.type === "admin"){
        next();
    }
    else if( req.userId === req.body.user_id && (req.mthod === "PUT" || "DELETE")){
        next();
    }
    else{
        res.status(status.HTTP_403_FORBIDDEN).json({ message: "can not mange anzer user"});
    }
} 