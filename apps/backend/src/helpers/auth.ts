import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

export default class MiddlewareAuth {
    // eslint-disable-next-line max-len
    hasRoles = (allowedRoles = []) => (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
          throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        (req as CustomRequest).token = decoded;
        req.user = decoded;

        if (allowedRoles.length >= 1) {
          // @ts-ignore
          const roles = (req.user?.roles) as string[];
          const rolesChecking = allowedRoles.every((e) => roles.includes(e));
          console.log(rolesChecking);
          if (!rolesChecking) {
            res.status(401).send({
              status: 401,
              message: 'this endpoint is prohibited for this role!',
            });
            return;
          }
        }

        next();
      } catch (error) {
        res.status(401).send({
          status: 401,
          message: 'this endpoint is prohibited!',
          error,
        });
      }
    }
}
