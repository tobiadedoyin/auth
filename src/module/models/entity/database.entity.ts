import mongoose, { Model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "minimun length of 6 characters"],
  },
});

//fire a function before saving to the database
userSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser> {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("email not found");
};

const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
