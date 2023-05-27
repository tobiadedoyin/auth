"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const database_entity_1 = __importDefault(require("../entity/database.entity"));
const signup_get = async (data) => {
    try {
        const createUser = new database_entity_1.default(data);
        const savedUser = await createUser.save();
        return savedUser;
    }
    catch (error) { }
};
exports.signup_get = signup_get;
const login_get = async () => {
    try {
    }
    catch (error) { }
};
exports.login_get = login_get;
const signup_post = async () => {
    try {
    }
    catch (error) { }
};
exports.signup_post = signup_post;
const login_post = async () => {
    try {
    }
    catch (error) { }
};
exports.login_post = login_post;
