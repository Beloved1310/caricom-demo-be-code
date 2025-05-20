// twilioVerify.ts
import twilio from 'twilio'
import axios from 'axios';
import { config } from 'dotenv'

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "c75bd84a",
  apiSecret: "ZMCmRJNXzqMO7TCd"
})

config()
interface VerificationResult {
  status: any
}

// const accountSid = 'AC8bd88f02c714065f775b839afcc9a702';
// const authToken = '[AuthToken]';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'hi',
//         from: '+19123488158',
//         to: '+2348160750829'
//     })
//     .then(message => console.log(message.sid))
//     .done();
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

async function sendText(to: string, randomCode: string): Promise<string> {
  try {
    // Send text message
    const message = await client.messages.create({
      body: `Your OTP code is: ${randomCode}`,
      from: '+19123488158', // Your Twilio phone number
      to: to,
    })

    return message.sid
  } catch (error : any) {
    console.error(`Error sending text message: ${error.message}`)
    throw error
  }
}



// const apiKey = process.env.VONAGE_API_KEY;
// const apiSecret = process.env.VONAGE_SECRET_KEY;
// const from = 'Vonage APIs';
// const to = '447435629242';
// const text = 'Your verification code is 123456';

// async function sendSMS() {
//   await axios.post('https://rest.nexmo.com/sms/json', {
//     api_key: apiKey,
//     api_secret: apiSecret,
//     to,
//     from,
//     text,
//   });
// }

const from = "Vonage APIs"
const to = "447435629242"
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then((resp: any) => { console.log('Message sent successfully'); console.log(resp); })
        .catch((err: any) => { console.log('There was an error sending the messages.'); console.error(err); });
}

// sendSMS();


export { initiateVerification, checkVerification, sendText, sendSMS }
