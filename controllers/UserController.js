import bcryptjs from "bcryptjs";
import { User } from "../models.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export async function register(req, res){
    try {
        const {username, password, passwordConfirm} = req.body;
        if(!username || !password || !passwordConfirm){
            return res.status(400).json({message: 'Fill all fields and try again.'});
        }
        const candidate = await User.findOne({username});
        if(candidate){
            return res.status(400).json({message: 'User with same username already exist.'});
        }
        const hashedPassword = await bcryptjs.hash(password, 6);
        const newUser = new User({username, passwordHash: hashedPassword});
        await newUser.save();
        const token = jwt.sign({
            _id: newUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        const {passwordHash, ...userData} = newUser._doc;
        return res.status(201).json({message: 'User created.', token, userData});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server error' | err.message});
    }
}

export async function login(req, res){
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message: 'User not found.'});
        }
        const passCompare = await bcryptjs.compare(password, user.passwordHash);
        if(!passCompare){
            return res.status(400).json({message: 'Invalid credentials.'});
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        const {passwordHash, ...userData} = user._doc;
        return res.json({message: 'Logged in.', token, userData});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server error' | err.message});
    }
}

export async function get_me(req, res){
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: 'User not found.'});
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        const {passwordHash, ...userData} = user._doc;
        return res.json({userData, token})
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server error' | err.message});
    }
}

export async function all_users(req, res){
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message || 'Server error.'});
    }
}

export async function reset_users(req, res){
    try {
        await User.deleteMany();
        return res.json({message: 'User list reseted.'});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message || 'Server error.'});
    }
}