import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars

export default class AuthServices {
  firebaseSignin = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = jwt.sign({
        ...req.user,
        roles: ['muallim', 'admin'],
      }, process.env.JWT_SECRET);
      res.status(200).send({
        accessToken: token,
        ...req.user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 500,
        message: 'Error internal server',
      });
    }
  };

  sessionCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 500,
        message: 'Error internal server',
      });
    }
  }
}
