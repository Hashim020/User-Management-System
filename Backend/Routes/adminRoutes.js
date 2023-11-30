import Express from "express";
const router = Express.Router();
// import { upload } from '../multer.js'
import {protect} from '../Middleware/adminAuthMiddleware.js'


import {
    authAdmin,
    adminRegister,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser,
    addNewUser
} from "../Controller/adminController.js";
router.post('/', adminRegister);
router.post('/auth', authAdmin);
router.post('/logout',logoutAdmin);
router.post('/get-user',protect,getAllUser);
router.put('/update-user',protect,updateUserData);
router.delete('/delete-user',protect,deleteUser);
router.post('/add-user',protect,addNewUser);







// router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('image'),updateUserProfile)


export default router