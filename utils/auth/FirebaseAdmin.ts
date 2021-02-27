const admin = require('firebase-admin');

import { Context } from '../../types/resolver_types';
import { User } from '../../entity/User';
import nookies from 'nookies';

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
};

export const verifyToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        'https://nextjs-firebase-auth-ec05a-default-rtdb.firebaseio.com',
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => {
      return undefined;
    });
};

export const getCurrentUser = async (
  ctx: Context
): Promise<User | undefined> => {
  const cookies = nookies.get(ctx);

  const token = await verifyToken(cookies.token);

  if (!token) return undefined;

  let user = await User.findOne({ id: token.user_id });

  if (!user) {
    user = new User();
    user.id = token.user_id;
    user.email = token.email;
    user.name = token.name || '';
    user.email_verified = token.email_verified;
    user.save();
  }

  return user;
};
