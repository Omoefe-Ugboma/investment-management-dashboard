import { JwtPayload } from './jwt'; // Your existing JWT payload type

declare global {
  namespace Express {
    interface User {
      [x: string]: never[];
      userId: string;
      email: string;
      roles: string[];
    }

    interface Request {
      user?: User;
    }
  }
}