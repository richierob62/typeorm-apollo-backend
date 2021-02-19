import { Context } from '../types/resolver_types';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User'

export const accountIsUnlocked: MiddlewareFn<Context> = async (
  {args},
  next
) => {

  const {email} = args.data

  const user = await User.findOne({email});

  
  // only check unlocked
  if (!user) return next();

  
  if (user.account_locked)
    throw new Error('your account is temporarily locked; check your email.');

  return next();
};
