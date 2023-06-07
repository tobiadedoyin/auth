"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const database_entity_1 = __importDefault(require("../models/entity/database.entity"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_entity_2 = __importDefault(require("../models/entity/database.entity"));
//handle errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };
    //duplicate error
    if (err.code === 11000) {
        errors.email = "email already exist";
    }
    //validator error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => (errors[properties.path] = properties.message));
    }
    return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, "tobi oladele", {
        expiresIn: maxAge,
    });
};
const signup_get = async (req, res) => {
    try {
        res.render("signup");
    }
    catch (error) { }
};
exports.signup_get = signup_get;
const login_get = async (req, res) => {
    try {
        res.render("login");
    }
    catch (error) { }
};
exports.login_get = login_get;
const signup_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await database_entity_1.default.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        //user["token"] = token;
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
};
exports.signup_post = signup_post;
const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new database_entity_2.default({ email, password });
        res.status(200).json({ user: user._id });
        console.log(user);
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json(error);
    }
};
exports.login_post = login_post;
