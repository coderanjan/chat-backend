import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import {Server} from 'socket.io'
import connectDB from './src/db/connectDB.js'
import userRoutes from './src/routes/user.routes.js'
import Message from './src/models/message.model.js'
import messageRoutes from './src/routes/message.routes.js'
import statsRoutes from './src/routes/stats.routes.js'




const app = express()
app.use(
    cors({
        origin:process.env.FRONTEND_URL
    })
)
app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/stats',statsRoutes)
const server = createServer(app)

const io= new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URL
    }
})

io.on('connection',(socket)=>{
    console.log("user connected:",socket.id);

    socket.on('user-join',(username)=>{
        socket.username=username
        console.log(username,'joined the chat');

        io.emit('user-join',username)
        
    })

    socket.on('message',async (message)=>{
            try {
                const savedMessage = await Message.create({
                    user:message.user,
                    text:message.text
                })

                io.emit("message",{
                    id:savedMessage._id,
                    user:savedMessage.user,
                    text:savedMessage.text,
                    createAt:savedMessage.createdAt
                })
            } catch (error) {
                console.log('messafe save failed',error.message);
                
            }
    
    })

    socket.on('disconnect',()=>{
       
        io.emit('user-left',socket.username)

        
        
    })
    
})
connectDB()
server.listen(process.env.PORT||5000,()=>{
    console.log('server running on port 5000');
    
})
