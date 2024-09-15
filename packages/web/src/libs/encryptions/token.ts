import crypto from 'node:crypto';

const getKeyAndIV = () => {
  const key = Buffer.from(process.env.KEY || '', 'hex');
  const iv = Buffer.from(process.env.IV || '', 'hex');
  return { key, iv };
};

export const encryptToken = (token: string): string => {
  const { key, iv } = getKeyAndIV();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedToken = cipher.update(token, 'utf8', 'hex');
  encryptedToken += cipher.final('hex');
  return encryptedToken;
};

export const decryptToken = (encryptedToken: string): string => {
  const { key, iv } = getKeyAndIV();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');
  return decryptedToken;
};
