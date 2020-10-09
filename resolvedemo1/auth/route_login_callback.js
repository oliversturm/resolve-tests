import jwt from 'jsonwebtoken';
import jwtSecret from './jwt_secret';

const routeLoginCallback = async (_, username) => {
  return jwt.sign({ username }, jwtSecret);
};

export default routeLoginCallback;
