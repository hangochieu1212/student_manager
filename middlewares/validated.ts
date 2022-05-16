import { statusCodes } from "../constants/api";
import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { generateResponseJson } from "../utils/response";

const validated = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const firstError = errors.array({ onlyFirstError: true })
    .at(0);
  res.status(statusCodes.BAD_REQUEST)
    .json(generateResponseJson(0, firstError?.msg, null));
};

export {
  validated,
};
