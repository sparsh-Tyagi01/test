const Users = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUserHandler(req,res) {
    try {
        const {name, email, password} = req.body;
        
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({"message": "email already registered"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword
        });

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(201).json({token, user});
    } catch (error) {
        console.error('Registeration Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function loginUserHandler(req,res) {
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({token, user});
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = {registerUserHandler, loginUserHandler}