"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://bemfot:Oladele@cluster0.hjhetys.mongodb.net/node-auth");
        console.log("database connected");
    }
    catch (error) {
        console.log("database connection error:", error);
    }
};
exports.default = connectDB;
