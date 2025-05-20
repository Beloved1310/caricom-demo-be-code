import express from 'express'
import { paymentController } from './payment.controller'
import { asyncErrorhandling } from '../../middleware/async'


const router = express.Router()
// Register
router.post('/otp', asyncErrorhandling(paymentController.sendOTP))


router.post('/otp/verify', asyncErrorhandling(paymentController.verifyOTP))


export default router
