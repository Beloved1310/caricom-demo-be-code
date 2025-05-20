"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const otp_service_1 = require("../../service/otp.service");
const generateNumbers_1 = require("../../utilis/generateNumbers");
exports.paymentService = {
    SendOtp(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = yield (0, generateNumbers_1.generateRandomNumbers)(4);
            const verificationTokenExp = new Date(Date.now() + 600000); // 10 mins
            //  const q =  await sendSMS()
            //  console.log(q)
            if (phoneNumber) {
                // await sendSMS()
                yield (0, otp_service_1.initiateVerification)(`${phoneNumber}`, 'sms');
                // await sendText(`${phoneNumber}`, verificationToken)
            }
            return "Otp Sent";
        });
    },
    verifyOtp(phoneNumber, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyPayload = yield (0, otp_service_1.checkVerification)(`${phoneNumber}`, `${code}`);
            return verifyPayload;
        });
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
};
