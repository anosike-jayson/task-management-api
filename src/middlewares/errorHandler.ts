import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }

  const errorDetails = {
    message: err.message || 'Unknown error',
    stack: err.stack || 'No stack trace available',
    path: req.path,
    method: req.method,
  };

  console.error('Global Error:', JSON.stringify(errorDetails, null, 2));

  if (err) {
    const statusCode = err.status || (res.statusCode !== 200 ? res.statusCode : 500);
    res.status(statusCode).json({
      message: statusCode === 500 ? 'Internal Server Error' : err.message,
      ...(process.env.NODE_ENV === 'development' && {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
      }),
    });
    return;
  }

  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}`,
    ...(process.env.NODE_ENV === 'development' && {
      path: req.path,
      method: req.method,
    }),
  });
};