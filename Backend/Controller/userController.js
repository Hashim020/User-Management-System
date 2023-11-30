import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'


//@desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


//@desc Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(400);
        throw new Error('User allready exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
    res.status(200).json({ message: 'Register User' })
})


//@desc LogOut user/set token
// route POST /api/users/Logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Successfully Logged Out' })
})



//@desc Get User Details
// route get /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const USER= await User.findById(req.user._id)
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImage:req.user.profileImage,
    };
    res.status(200).json(user)
})



//@desc Update User Profile
// route POST /api/users/auth
// @access public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        if (req.file) {
            user.profileImage = req.file.filename || user.profileImage
        }
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
        });
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})






export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}