import type { Schema } from 'joi';
import type { NextFunction, Request, Response } from 'express';

import { ApiErrors } from '../errors/ApiError';

export default (schema: Schema, prop: 'body' | 'params' | 'query') => {
  const controller = (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[prop]);
    if (error) throw ApiErrors.BAD_REQUEST(error.message);
    if (value) req[prop] = value;

    next();
  };

  return controller;
};
