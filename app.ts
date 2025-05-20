import express, { Application, Request, Response } from "express";
import path from "path";
import payment from "./modules/payment/index";


declare global {
  namespace Express {
    interface Request {
      user?: any;
      refreshTokenId: any;
    }
  }
}

const app: Application = express();


app.use(express.urlencoded({ extended: true, limit: 52428800 }));
app.use(express.json({ limit: 52428800 }));
app.use("/upload", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
// app.get("/", (req: Request, res: Response) => {
//   return res.send("OK");
// });

app.use('/api/v1/payment', payment)

export default app;