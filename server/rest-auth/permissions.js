import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import status from "../framework/status.js";

dotenv.config();

const SECRET = process.env.SECRET;

const auth_erorr = {
    "error": {
        "code": "UNAUTHORIZED",
        "message": "Access denied. Invalid or missing authentication token.",
        "details": {
            "reason": "Token not provided or invalid"
        }
    }
}

const ifNotToken = (req, res) => {
    if(!req.headers.authorization){
        return true;
    }
    else {
        return false;
    }
}

const verifyToken = (req, res) => {
    if(!req.headers.authorization){
        res.status(status.HTTP_401_UNAUTHORIZED).json(
            auth_erorr
        );
        return ;
    }
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodeData;

    //If token is custom token do this
    if (token && isCustomAuth) {
        decodeData = jwt.verify(token, SECRET)

        req.userId = decodeData.id;
        req.type = decodeData.type;

    } else {
        //Else of token is google token then do this
        decodeData = jwt.decode(token);

        req.userId = decodeData.sub;
    }
    return true;
}

const isAuth = async (req, res, next) => {
    try {
        
        if(!verifyToken(req, res)){
            return ;
        }
        next();

    } catch (error) {
        res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if(!verifyToken(req, res)){
            return ;
        }
        if (req.type === "admin") {
            next();
        }
        else {
            res.status(status.HTTP_401_UNAUTHORIZED).json(
                auth_erorr
            );
        }

    } catch (error) {
        res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

const isReader = async (req, res, next) => {
    try {
        if(!verifyToken(req, res)){
            return ;
        }

        next();
        

    } catch (error) {
        res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

const isReaerOrReadOnly = async (req, res, next) => {
    if(req.method === "GET"){
        next()
    }
    isReader(req, res, next);
}

const isAdminOrReadOnly =  async (req, res, next) => {
    if(req.method === "GET"){
        return isReader(req, res, next)
    }
    else {
        return isAdmin(req, res, next);
    }
}

const isAdminOrSifeMethod =  async (req, res, next) => {
    if(req.method === ("GET" || "POST")){
        return isReader(req, res, next)
    }
    else {
        return isAdmin(req, res, next);
    }
}

const adminCreateOnly = async (req, res, next) => {
    if(req.method === "GET"){
        if(!ifNotToken)
            verifyToken(req, res);
        next()
    }
    else {
        return isAdmin(req, res, next);
    }
}

export {
    isAdmin,
    isAuth,
    isAdminOrReadOnly,
    isReaerOrReadOnly,
    isAdminOrSifeMethod,
    adminCreateOnly,
};