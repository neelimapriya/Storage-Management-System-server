import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = async (
  jwtPayload: object, 
  secret: string,
  expiresIn: string | number,
): Promise<string> => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
  return token;
};


export const verifyToken = async (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };