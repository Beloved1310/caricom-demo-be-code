import { Request, Response } from "express";
import { paymentService } from "./payment.service";


export const paymentController = {
  async sendOTP(req: Request, res: Response): Promise<any> {
    await paymentService.SendOtp(req.body.phoneNumber);
    res.send( {
      phoneNumber:req.body.phoneNumber
    })
  },

  async verifyOTP(req: Request, res: Response): Promise<any> {
   const verifyStatus =  await paymentService.verifyOtp(req.body.phoneNumber, req.body.otp);
   res.send( {
    phoneNumber:req.body.phoneNumber,
    status: verifyStatus
  })
  },

//   async verifyToken(req: Request, res: Response): Promise<{}> {
//     const { value, error } = userValidation.verify.validate(req.body);
//     if (error) return res.status(400).send({ error: error.details[0].message });
//     const { token } = await userService.verifyToken(value);
//     res.header("authorization", token);
//     const data = { token };
//     return ResponseService.success(
//       res,
//       "Congratulations! You have been successfully verified!",
//       data
//     );
//   },
};
