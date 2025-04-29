import User from "../models/user.model.js";

async function Register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                "id": newUser._id,
                "name": newUser.name,
                "email": newUser.email,
                "role": newUser.role,
                "password": newUser.password
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

async function Retrieve(req,res) {
    try {
        const {id} = req.params;

        const foundUser = await User.findOne({_id : id});

        if(foundUser){
            res.status(201).json({
                "id": foundUser._id,
                "name": foundUser.name,
                "email": foundUser.email,
                "role": foundUser.role
            })
        }
        else{
            res.status(400).json({
                message:"Invalid User Id"
            })
        }

    } 
    catch (error) {
        console.log('Error on Retrieve user ',error.message);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export { Register,Retrieve };