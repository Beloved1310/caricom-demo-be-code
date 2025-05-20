import crypto from "crypto"

export const generateRandomNumbers = async (length: number) => {
    const numCharacters = '0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, numCharacters.length);
      randomString += numCharacters.charAt(randomIndex);
    }
  
    return randomString;
}
