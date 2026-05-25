import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      console.log("ZOD ERROR:", err);

      if (err.issues) {
        return res.status(400).json({
          error: true,
          message: err.issues,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Validation failed",
      });
    }
  };
};
