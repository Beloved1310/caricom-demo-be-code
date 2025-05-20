import { initiateVerification, sendText, checkVerification } from '../../service/otp.service'
import { generateRandomNumbers } from '../../utilis/generateNumbers'

export const paymentService = {
  async SendOtp(phoneNumber:string) {
   
    const verificationToken = await generateRandomNumbers(4)
    const verificationTokenExp = new Date(Date.now() + 600000) // 10 mins
  //  const q =  await sendSMS()
  //  console.log(q)
    if (phoneNumber) {
      // await sendSMS()
      await initiateVerification(`${phoneNumber}`, 'sms')
      // await sendText(`${phoneNumber}`, verificationToken)
    }
    return "Otp Sent"
  },

  async verifyOtp(phoneNumber:string, code:string) {
   
   const verifyPayload = await checkVerification(`${phoneNumber}`, `${code}`)
  
    return verifyPayload
  },

//   async verifyToken(verificationToken: number) {


//     const expirationTime = new Date(user.verificationTokenExp)
//     const currentDateTime = new Date()
//     const twentyMinutesAgo = new Date(
//       currentDateTime.getTime() - 20 * 60 * 1000,
//     ) // 20 minutes in milliseconds

//     if (expirationTime < twentyMinutesAgo) {
//       throw new ValidationError('Token has expired, Proceed to Register')
//     }
//     const token = user.generateAuthToken()
//     await userRepository.updateUserData(
//       { verificationToken, verificationTokenExp: Date.now(), isVerified: true },
//       {
//         _id: userId,
//       },
//     )
//     return { user, token }
//   },

  
}
