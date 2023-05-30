import { Request, Response } from "express";
import User from "../models/entity/database.entity";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { IUser } from "../models/entity/database.entity";
import login from "../models/entity/database.entity";

//handle errors
const handleErrors = (err: any) => {
  let errors = { email: "", password: "" };

  //duplicate error
  if (err.code === 11000) {
    errors.email = "email already exist";
  }
  //validator error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(
      ({ properties }) => (errors[properties.path] = properties.message)
    );
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, "tobi oladele", {
    expiresIn: maxAge,
  });
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
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    user["token"] = token;
    res.status(201).json({ user });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

export const login_post = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const user = await new login({ email, password });
    res.status(200).json({ user: user._id });
    console.log(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
