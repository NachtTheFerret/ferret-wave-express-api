import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ApiError) {
    const { status, code, message } = error;
    res.status(status).json({ status, code, message });
  } else {
    res.status(500).json({ status: 500, code: 'INTERNAL_SERVER_ERROR', message: 'internal error' });
    console.log(error);
  }
};
