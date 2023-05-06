import express from "express";
import fileUpload from "express-fileupload"
import path from "path"
import status from "./status.js"

const __dirname = path.dirname(new URL(import.meta.url).pathname);


const app = express();

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files

        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}


const filepayloadExists = (req, res, next) => {
    if (!req.files) {
        return res.status(status.HTTP_400_BAD_REQUEST).json({ status: "error", message: "Missing files" });
    }
    next()
}

const fileSizeLimiter = (req, res, next) => {
    const MB = 10;
    const FILE_SIZE_LIMITER = MB * 1024 * 1024;

    const files = req.files;
}

const onUpload = (req, res, next) => {
    fileUpload({ createParentPath: true }),
    (req, res) => {
        const files = req.files;
        Object.keys(files).forEach(key => {
            const filePath = path.join(__dirname, `upload/${key}`, '1')
            files[key].mv(filePath, (error) => {
                console.log(error);
            })
        })
        console.log(files);
    }
}
