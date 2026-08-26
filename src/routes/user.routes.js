import express from 'express'
import { createUser,getUsers,updatedUser,deleteUser,loginUser,getCurrentUser} from '../controllers/user.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/',createUser)
router.get('/' ,authMiddleware,getUsers)
router.put('/:id',updatedUser)
router.delete('/:id',deleteUser)
router.post('/login',loginUser)
router.get('/me',authMiddleware,getCurrentUser)


export default router