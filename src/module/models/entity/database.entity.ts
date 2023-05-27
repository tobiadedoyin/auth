import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
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

//fire a function after document has been saved
// userSchema.post("save", (doc, next) => {
//   console.log("new user created and saved", doc);
//   next();
// });

//fire a function before saving to the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
