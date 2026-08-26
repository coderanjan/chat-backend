import Message from "../models/message.model.js";
import User from "../models/User.js";

const getStats = async (requestAnimationFrame,res)=>{
    try {
        const totalUsers= await User.countDocuments()
        const totalMessages=await Message.countDocuments()

        res.status(200).json({
            totalUsers,
            totalMessages
            
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export {getStats}
