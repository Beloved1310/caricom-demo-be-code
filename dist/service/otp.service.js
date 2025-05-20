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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateVerification = initiateVerification;
exports.checkVerification = checkVerification;
// twilioVerify.ts
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } = process.env;
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SID) {
    throw new Error('Twilio credentials are missing. Make sure to set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SID environment variables.');
}
const client = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
function initiateVerification(to, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verification = yield client.verify.v2
                .services(process.env.TWILIO_VERIFY_SID)
                .verifications.create({ to, channel });
            console.log(verification, "!!!");
            return verification;
        }
        catch (error) {
            console.error(`Error initiating verification: ${error.message}`);
            throw error;
        }
    });
}
function checkVerification(to, code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verificationCheck = yield client.verify.v2
                .services(TWILIO_VERIFY_SID)
                .verificationChecks.create({ to, code });
            console.log(verificationCheck, "QQ");
            return verificationCheck.status;
        }
        catch (error) {
            console.error(`Error checking verification: ${error.message}`);
            throw error;
        }
    });
}
