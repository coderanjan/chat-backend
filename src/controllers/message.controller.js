import Message from '../models/message.model.js'

const getMessages=async (req,res)=>{
    try {
        const messages = await Message.find()
             .sort({createdAt:1})
             .limit(100)

        res.status(200).json({
            messages
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export {getMessages}