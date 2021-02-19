import { Request, Response } from 'express';

import { Redis } from 'ioredis';

export interface Context {
  req: Request;
  res: Response;
  redis: Redis;
  confirmUrl: string;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunction = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
