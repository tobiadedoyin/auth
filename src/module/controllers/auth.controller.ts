import { Request, Response } from "express";
import User from "../models/entity/database.entity";

//handle errors
const handleErrors = (err: any) => {
  //console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //duplicate error
  if (err.code === 11000) {
    errors.email = "email already exist";
    return errors;
  }

  //validator error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(
      ({ properties }) => (errors[properties.path] = properties.message)
    );
  }
  return errors;
};

export const signup_get = async (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (error) {}
};

export const login_get = async (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (error) {}
};

export const signup_post = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

export const login_post = async (req: Request, res: Response) => {
  try {
    res.send("login");
  } catch (error) {}
};
