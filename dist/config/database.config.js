"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("database connected");
    }
    catch (error) {
        console.log("database connection error:", error);
    }
};
exports.default = connectDB;
