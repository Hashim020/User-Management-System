import Express from "express";
const router = Express.Router();
import { upload } from '../multer.js'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,

} from "../Controller/userController.js";
import {protect} from '../Middleware/authMiddleware.js'
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('image'),updateUserProfile)


export default router