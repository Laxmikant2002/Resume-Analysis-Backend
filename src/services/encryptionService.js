const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config({ path: './src/.env' }); // Ensure the correct path to the .env file

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(
    text, 
    process.env.ENCRYPTION_KEY, 
    { iv: CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_IV) }
  ).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.ENCRYPTION_KEY,
    { iv: CryptoJS.enc.Hex.parse(process.env.ENCRYPTION_IV) }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };