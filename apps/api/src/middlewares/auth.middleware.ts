import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Format de token invalide' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
}; 