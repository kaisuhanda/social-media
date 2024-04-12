const multer = require("multer");
const fs = require("fs");

module.exports = {
    uploader: (directory) => {
        const defaultDir = "./public";
        const storageUploader = multer.diskStorage({
            destination: (req, file, cb) => {
                const pathDir = directory ? defaultDir + directory : defaultDir;
                if (fs.existsSync(pathDir)) {
                    console.log("Directory " + pathDir + " exists");
                    cb(null, pathDir);
                } else {
                    fs.mkdir(pathDir, (error) => {
                        if (error) {
                            console.log(error);
                            cb(error);
                        } else {
                            cb(null, pathDir);
                        }
                    });
                }
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()} - ${file.originalname}`);
            },
        });

        const fileFilter = (req, file, cb) => {
            console.log(file);
            if (
                file.originalname.toLowerCase().includes("png") ||
                file.originalname.toLowerCase().includes("jpg")
            ) {
                cb(null, true);
            } else {
                const customError = new Error("File extension denied");
                customError.code = "LIMIT_FILE_TYPE";
                cb(customError, false);
            }
        };

        return multer({
            storage: storageUploader,
            fileFilter,
        });
    },
};
