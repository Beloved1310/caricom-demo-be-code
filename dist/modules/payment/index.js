"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const async_1 = require("../../middleware/async");
const router = express_1.default.Router();
// Register
router.post('/otp', (0, async_1.asyncErrorhandling)(payment_controller_1.paymentController.sendOTP));
router.post('/otp/verify', (0, async_1.asyncErrorhandling)(payment_controller_1.paymentController.verifyOTP));
exports.default = router;
