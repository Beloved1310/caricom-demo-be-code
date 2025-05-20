// twilioVerify.ts
import twilio from 'twilio'
import axios from 'axios';
import { config } from 'dotenv'


config()
interface VerificationResult {
  status: any
}
interface TwilioClient {
  verify: {
    v2: {
      services(sid: any): ServiceResource
    }
  }
  messages: {
    create(options: { body: string; from: string; to: string }): Promise<any>
  }
}

interface ServiceResource {
  verifications: {
    create(options: {
      to: string
      channel: string
    }): Promise<VerificationResult>
  }
  verificationChecks: {
    create(options: { to: string; code: string }): Promise<VerificationResult>
  }
}

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } = process.env

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SID) {
  throw new Error(
    'Twilio credentials are missing. Make sure to set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SID environment variables.',
  )
}

const client: TwilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
 
async function initiateVerification(
  to: string,
  channel: string,
): Promise<string> {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to, channel })
      console.log(verification, "!!!")
    return verification.status
  } catch (error : any) {
    console.error(`Error initiating verification: ${error.message}`)
    throw error
  }
}

async function checkVerification(to: string, code: string): Promise<{}> {
  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_VERIFY_SID)
      .verificationChecks.create({ to, code })
      console.log(verificationCheck, "QQ")
    return verificationCheck
  } catch (error : any) {
    console.error(`Error checking verification: ${error.message}`)
    throw error
  }
}



export { initiateVerification, checkVerification }
