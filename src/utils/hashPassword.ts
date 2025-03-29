import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  originPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(originPassword, hashedPassword);
};
