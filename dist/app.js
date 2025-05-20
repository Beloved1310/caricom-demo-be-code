"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./modules/payment/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true, limit: 52428800 }));
app.use(express_1.default.json({ limit: 52428800 }));
app.use("/upload", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use("/uploads", express_1.default.static(path_1.default.resolve(__dirname, "../uploads")));
// app.get("/", (req: Request, res: Response) => {
//   return res.send("OK");
// });
app.use('/api/v1/payment', index_1.default);
exports.default = app;
