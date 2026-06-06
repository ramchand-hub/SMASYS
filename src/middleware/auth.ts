import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const authorize = (roles: string[] | string) => {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
  };
};

export default authenticate;
