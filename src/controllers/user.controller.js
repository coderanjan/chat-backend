import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createUser = async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const userResponse = user.toObject()
        delete userResponse.password
        res.status(201).json({
            message:"User created successfully",
            user:userResponse
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"Invalid email or passoword"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )

        res.status(200).json({
            message:'Login successful',
            token
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getUsers = async (req,res)=>{
    try {
        const users = await User.find().select('-password')
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const updatedUser = async (req,res)=>{
    try {
        const {id}=req.params 
        const {name,email}=req.body
        const user = await User.findByIdAndUpdate(
            id,
            {name,email},
            {new:true}
        )

        if(!user){
            return res.status(404).jsons({
                message:"User not found"
            })
        }

        res.status(200).json({
            message:"User updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteUser = async (req,res)=>{
    try {
        const {id}= req.params
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        res.status(200).json({
            message:"user deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getCurrentUser = async (req,res)=>{
    try {
        const user=await User.findById(req.userId).select('-password') 

        if(!user){
            return res.status(404).json({
                message:'user not found'
            })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export {createUser,getUsers,updatedUser,deleteUser,loginUser,getCurrentUser}