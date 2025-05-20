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
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
exports.paymentController = {
    sendOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield payment_service_1.paymentService.SendOtp(req.body.phoneNumber);
            return {
                phoneNumber: req.body.phoneNumber
            };
        });
    },
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyPayload = yield payment_service_1.paymentService.verifyOtp(req.body.phoneNumber, req.body.otp);
            return verifyPayload;
        });
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
