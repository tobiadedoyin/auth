"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail_1.default, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "minimun length of 6 characters"],
    },
});
//fire a function before saving to the database
userSchema.pre("save", async function (next) {
    const salt = await bcryptjs_1.default.genSalt();
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function ({ email, password, }) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcryptjs_1.default.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("email not found");
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
