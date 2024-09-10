import * as bcrypt from 'bcrypt';

export async function hashPassword (password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function comparePassword (password, hashPassword) {
  const match = await bcrypt.compare(password, hashPassword);
  return match;
}
