import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export function validateParams(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(httpStatus.BAD_REQUEST).json({ errors: result.error.errors });
    }
    next();
  };
}
