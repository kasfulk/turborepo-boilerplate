import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

export default class FirebaseAuth {
    private firebaseSA = Buffer.from(process.env.FIREBASE_SA, 'base64').toString('utf8');

    private firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(this.firebaseSA)),
    });

    middlewareAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const authFirebase = admin.auth(this.firebaseApp);
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = await authFirebase.verifyIdToken(token);
        req.user = verifyToken;
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
