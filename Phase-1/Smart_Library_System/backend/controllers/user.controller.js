import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function Register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const salt = 10;
        let hashedPassword;

        hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            role
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                "id": newUser._id,
                "name": newUser.name,
                "email": newUser.email,
                "role": newUser.role,
            })
        }

        else {
            res.status(400).json({
                error: "Invalid User Data"
            })
        }
    }
    catch (error) {
        console.log("Error in user controller ", error.message);
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function Retrieve(req, res) {
    try {
        const { id } = req.params;

        const foundUser = await User.findOne({ _id: id });

        if (foundUser) {
            res.status(200).json({
                "id": foundUser._id,
                "name": foundUser.name,
                "email": foundUser.email,
                "role": foundUser.role
            })
        }
        else {
            res.status(404).json({
                message: "Invalid User Id"
            })
        }

    }
    catch (error) {
        console.log('Error on Retrieve user ', error.message);
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function Update(req, res) {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if(updatedUser){
            res.status(200).json({
                message:{updatedUser}
            })
        }
        else{
            res.status(404).json({
                message : "User not Found"
            })
        }
    }
    catch (error) {
        console.log('Error on Retrieve user ', error.message);
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function getUser(id) {
    try {
        const user = await User.findById(id);

        if(user){
            return user;
        }
        else{
            console.log('User not Found');
        }
    } 
    catch (error) {
        console.log('Error on Retrieve user ', error.message);
        return null;
    }
}

async function getTotalUsers() {
    try {
        const totalUsers = await User.countDocuments();
        if(totalUsers){
            return totalUsers;
        }
        else{
            console.log('Counld not get totalUsers');   
            return; 
        }
    } 
    catch (error) {
        console.log('Error occured in the getTotalUsers:',error.message);
    }
}

export { Register, Retrieve ,Update , getUser , getTotalUsers};