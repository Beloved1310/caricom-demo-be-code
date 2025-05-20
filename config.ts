import path from "path";

import dotenv, { config as dotenv2 } from "dotenv";
import { IConfig } from "./interfaces/iConfig";

const { env } = process;

dotenv.config();

dotenv2({
  path: path.resolve(__dirname, "./.env"),
});

export const config: IConfig = {
  PORT: parseInt(env.PORT!, 10) || 8000,
  MONGODBURI: <string>env.MONGODBURI,
  JWT : <string>env.JWT,
  REFRESH_JWT: <string>env.REFRESH_JWT,
  AWS_BUCKET_NAME:<string>env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: <string>env.AWS_BUCKET_REGION,
  AWS_ACCESS_KEY:  <string>env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: <string>env.AWS_SECRET_KEY,
  MAILGUN_API_KEY:<string>env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN :<string>env. MAILGUN_DOMAIN 
};
