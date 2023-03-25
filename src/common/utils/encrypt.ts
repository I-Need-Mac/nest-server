import * as crypto from 'crypto';
import * as fs from 'fs';

let privateKey: crypto.KeyObject | null = null;

const getPrivateKey = () => {
  if (privateKey) return privateKey;

  privateKey = crypto.createPrivateKey({
    key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
    format: 'pem',
    type: 'pkcs1',
  });
  return privateKey;
};

const encrypt = (data: any) => {
  return crypto.privateEncrypt(getPrivateKey(), Buffer.from(data, 'utf8')).toString('base64');
};

export default encrypt;
