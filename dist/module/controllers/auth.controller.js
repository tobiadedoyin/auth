"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const database_entity_1 = __importDefault(require("../models/entity/database.entity"));
//handle errors
const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = { email: "", password: "" };
    //duplicate error
    if (err.code === 11000) {
        errors.email = "email already exist";
        return errors;
    }
    //validator error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => (errors[properties.path] = properties.message));
    }
    return errors;
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
        res.status(201).json(user);
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
};
exports.signup_post = signup_post;
const login_post = async (req, res) => {
    try {
        res.send("login");
    }
    catch (error) { }
};
exports.login_post = login_post;
