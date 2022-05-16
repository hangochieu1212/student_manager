import { body } from "express-validator";

const idValidator = () =>
  body("id")
    .trim()
    .isLength({ min: 1 })
    .withMessage("The id field is required")
    .escape();

const firstnameValidator = () =>
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("The firstname must be at least 3 characters")
    .escape();

const lastnameValidator = () =>
  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("The lastname must be at least 3 characters")
    .escape();

const emailValidator = () =>
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email");

const usernameValidator = () =>
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("The username must be at least 3 characters")
    .escape();

const passwordValidator = () =>
  body("password")
    .trim()
    .isLength({
      min: 8,
    })
    .withMessage("Password must be least 8 characters long")
    .matches(/\d/)
    .withMessage("must contain a number")
    .matches(/[A-Z]+/)
    .withMessage("must contain an uppercase character")
    .matches(/[a-z]+/)
    .withMessage("must contain a lowercase character")
    .escape();

const validators = {
  id: idValidator,
  firstname: firstnameValidator,
  lastname: lastnameValidator,
  email: emailValidator,
  username: usernameValidator,
  password: passwordValidator,
};

const validate = (...args: any) => {
  const validations: any[] = [];

  args.forEach((arg: string) => {
    // @ts-ignore
    const validator = validators[arg];
    if (validator) {
      validations.push(validator());
    }
  });
  return validations;
};

export default validate;
