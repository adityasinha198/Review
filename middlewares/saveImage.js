const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `image_${Date.now()}-${file.originalname}`)
    }
})

const isImage = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }else {
        cb(new Error("Only images are allowed"))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: isImage
})

module.exports = upload 
