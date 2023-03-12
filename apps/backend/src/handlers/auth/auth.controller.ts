import { Router } from 'express';
import FirebaseAuth from '../../helpers/firebase';
import MiddlewareAuth from '../../helpers/auth';
import AuthServices from './auth.services';

export default class AuthController {
  public path = '/auth';

  public router: Router = Router();

  private firebaseAuth = new FirebaseAuth();

  private authServices: AuthServices = new AuthServices();

  private middlewareAuth: MiddlewareAuth = new MiddlewareAuth();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}/firebase-signin`, this.firebaseAuth.middlewareAuth, this.authServices.firebaseSignin);
    this.router.get(`${this.path}/session`, this.middlewareAuth.hasRoles(), this.authServices.sessionCheck);
  }
}
