import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/public/images')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  },
})


export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})